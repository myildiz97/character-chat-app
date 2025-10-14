"use client"

import { useCharacters } from '@/hooks/use-characters';
import { useChatHistory } from '@/hooks/use-chat-history';
import Image from 'next/image';
import Link from 'next/link';

export function ChatHistory() {
  const { characters } = useCharacters();
  const { chatHistory } = useChatHistory();

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-2xl font-bold">For You</h2>
      {characters.map((character) => (
        <Link href={`/chat/${character.id}`} key={character.id} className="flex gap-2 border border-border p-4 rounded-md">
          <Image height={100} width={100} src={character.avatar_url || ''} alt={character.name} unoptimized/>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{character.name}</h3>
            <p>{character.description}</p>
          </div>
        </Link>
      ))}
      <h2 className="text-2xl font-bold">Chat History</h2>
      {chatHistory.map((chat) => (
        <Link href={`/chat/${chat.character.id}`} key={chat.character.id} className="flex gap-2 border border-border p-4 rounded-md">
          <Image height={100} width={100} src={chat.character.avatar_url || ''} alt={chat.character.name} unoptimized/>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{chat.character.name}</h3>
            <p>{chat.lastMessage}</p>
            <p>{new Date(chat.createdAt).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}