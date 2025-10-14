"use client"

import { useCharacters } from '@/hooks/use-characters';
import { useChatHistory } from '@/hooks/use-chat-history';
import CharactersCarousel from '../character/characters-carousel';
import { ChatHistoryCarousel } from './chat-history-carousel';
import { SearchBar } from '../shared/search-bar';

export function ChatsDashboard() {
  const { characters } = useCharacters();
  const { chatHistory } = useChatHistory();

  return (
    <div className="flex flex-col gap-2 p-4">
      <SearchBar />
      <h2 className="text-2xl font-bold">For You</h2>
      <CharactersCarousel characters={characters} />
      <h2 className="text-2xl font-bold">Chat History</h2>
      <ChatHistoryCarousel chatHistory={chatHistory} />
    </div>
  )
}