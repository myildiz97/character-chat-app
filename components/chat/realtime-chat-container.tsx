"use client"

import { IChatMessage } from '@/lib/types/chat';
import { useEffect, useState } from 'react';
import { RealtimeChat } from './realtime-chat';
import { ICharacterDB } from '@/lib/types/character';

interface IRealtimeChatContainerProps {
  characterId: string;
}

export function RealtimeChatContainer({ characterId }: IRealtimeChatContainerProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [character, setCharacter] = useState<ICharacterDB | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
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
    }
    fetchMessages();

    const fetchCharacter = async () => {
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
    }
    fetchCharacter();
  }, [characterId]);

  if (!character) {
    return <div>Loading...</div>
  }

  return (
    <RealtimeChat
      character={character as ICharacterDB}
      messages={messages} 
    />
  )
}