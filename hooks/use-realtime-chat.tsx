import { useUserContext } from '@/components/context/user-context';
import { getGroqChatCompletion } from '@/lib/actions/groq-action';
import { EVENT_CHAT_TYPE } from '@/lib/constants/chat';
import { ICharacterDB } from '@/lib/types/character';
import { IChatMessage, IChatMessageCore } from '@/lib/types/chat';
import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

interface IUseRealtimeChatProps {
  characterId: string;
} 

export function useRealtimeChat({ characterId }: IUseRealtimeChatProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    const newChannel = supabase.channel(`chat:${characterId}`);

    newChannel.on('broadcast', { event: EVENT_CHAT_TYPE }, (payload) => {
      setMessages((currentMessages) => [...currentMessages, payload.payload as IChatMessage]);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
      }
    })

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    }
    
  }, [characterId, supabase]);

  const sendMessage = useCallback(async (content: string) => {
    if (!channel || !isConnected || !user) return;

    const userMessage: IChatMessage = {
      id: crypto.randomUUID(),
      user_id: user.id,
      character_id: characterId,
      role: 'user',
      content: content,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage]);

    try {
      setWaitingForResponse(true);

      const userResponse = await fetch(`/api/chat/${characterId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          role: 'user',
        }),
      })

      if (!userResponse.ok) {
        throw new Error("Failed to send message")
      }

      const data = await userResponse.json();

      await channel.send({
        type: 'broadcast',
        event: EVENT_CHAT_TYPE,
        payload: data,
      });

      const newMessages: IChatMessage[] = [...messages, data];

      const characterResponse = await fetch(`/api/character/${characterId}`);
      if (!characterResponse.ok) {
        throw new Error("Failed to fetch character")
      }
      const character = await characterResponse.json() as ICharacterDB;

      const systemMessage: IChatMessageCore = {
        role: 'system',
        content: character.system_prompt,
      };

      const messageHistory: IChatMessageCore[] = newMessages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
      messageHistory.unshift(systemMessage);

      const completion = await getGroqChatCompletion({ messages: messageHistory });
      const completionContent = completion.choices[0]?.message?.content || 'There was an error generating a response';

      const assistantResponse = await fetch(`/api/chat/${characterId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: completionContent,
          role: 'assistant',
        }),
      })

      if (!assistantResponse.ok) {
        throw new Error("Failed to send message")
      }

      const assistantData = await assistantResponse.json();
      newMessages.push(assistantData);

      await channel.send({
        type: 'broadcast',
        event: EVENT_CHAT_TYPE,
        payload: assistantData,
      });

      setMessages(newMessages);
      setWaitingForResponse(false);
    } catch (error) {
      console.error(error);
      setWaitingForResponse(false);
    }
  }, [characterId, isConnected, messages, channel, user]);

  return { messages, sendMessage, isConnected, channel, waitingForResponse };
}