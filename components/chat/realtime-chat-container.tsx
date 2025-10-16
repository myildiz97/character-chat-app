"use client"

import { IChatMessage } from '@/lib/types/chat';
import { useEffect, useState } from 'react';
import { RealtimeChat } from './realtime-chat';
import { ICharacterDB } from '@/lib/types/character';
import { ChatSkeleton } from './chat-skeleton';
import { RealtimeChatHeader } from './realtime-chat-header';
import { RealtimeChatHeaderSkeleton } from './chat-header-skeleton';
import { API_ROUTES, handleApiError } from '@/lib/api-utils';
import { toast } from 'sonner';

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
      try {
        setIsCharacterLoading(true);
        const endpoint= `${API_ROUTES.CHARACTERS}/${characterId}`
        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch character. Please refresh the page and try again.")
        }

        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character:", error);
        toast.error(handleApiError(error));
      } finally {
        setIsCharacterLoading(false);
      }
    }
    const fetchMessages = async () => {
      try {
        setIsMessagesLoading(true);
        const endpoint= `${API_ROUTES.CHAT}/${characterId}`
        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch messages. Please refresh the page and try again.")
        }
  
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(handleApiError(error));
      } finally {
        setIsMessagesLoading(false);
      }
    }

    Promise.all([fetchCharacter(), fetchMessages()]);
  }, [characterId]);


  return (
    <div className="relative flex flex-col w-full items-center flex-1 h-dvh">
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
    </div>
  )
}