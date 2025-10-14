"use client"

import { IChatMessage } from '@/lib/types/chat';
import { useEffect, useState } from 'react';
import { RealtimeChat } from './realtime-chat';

interface IRealtimeChatContainerProps {
  characterId: string;
}

export function RealtimeChatContainer({ characterId }: IRealtimeChatContainerProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const endpoint= `/api/chat?characterId=${characterId}`
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json();
      setMessages(data.messages);
    }
    fetchMessages();
  }, [characterId]);

  return (
    <RealtimeChat
      characterId={characterId}
      messages={messages} 
    />
  )
}