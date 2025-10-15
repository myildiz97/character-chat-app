"use client"

import { IChatMessage } from '@/lib/types/chat';
import { useEffect, useState } from 'react';
import { RealtimeChat } from './realtime-chat';
import { ICharacterDB } from '@/lib/types/character';
import { ChatSkeleton } from './chat-skeleton';
import { RealtimeChatHeader } from './realtime-chat-header';
import { RealtimeChatHeaderSkeleton } from './chat-header-skeleton';

interface IRealtimeChatContainerProps {
  characterId: string;
}

export function RealtimeChatContainer({ characterId }: IRealtimeChatContainerProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [character, setCharacter] = useState<ICharacterDB | null>(null);
  const [isCharacterLoading, setIsCharacterLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsCharacterLoading(true);
      const endpoint= `/api/character/${characterId}`
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch character")
      }

      const data = await response.json();
      setCharacter(data);
      setIsCharacterLoading(false);
    }
    fetchCharacter();

    const fetchMessages = async () => {
      setIsMessagesLoading(true);
      const endpoint= `/api/chat/${characterId}`
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json();
      setMessages(data.messages);
      setIsMessagesLoading(false);
    }
    fetchMessages();
  }, [characterId]);


  return (
    <>
      {
        isCharacterLoading ? <RealtimeChatHeaderSkeleton /> : (
          <RealtimeChatHeader character={character as ICharacterDB} />
        )
      }
      {
        (isMessagesLoading || isCharacterLoading) ? <ChatSkeleton /> : (
          <RealtimeChat
            character={character as ICharacterDB}
            messages={messages} 
          />
        )
      }
    </>
  )
}