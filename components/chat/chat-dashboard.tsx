"use client"

import { useCharacters } from '@/hooks/use-characters';
import { useChatHistory } from '@/hooks/use-chat-history';
import CharactersCarousel from '../character/characters-carousel';
import { ChatHistoryCarousel } from './chat-history-carousel';
import { SearchBar } from '../shared/search-bar';
import CarouselSkeleton from '../shared/carousel-skeleton';
import { AvatarContainer } from '../shared/avatar-container';

export function ChatsDashboard() {
  const { characters, isLoading: charactersLoading } = useCharacters();
  const { chatHistory, isLoading: chatHistoryLoading } = useChatHistory();

  const existingCharacters = chatHistory.map((chat) => chat.character.id);
  const forYouCharacters = characters.filter((character) => !existingCharacters.includes(character.id));

  return (
    <div className="w-full flex flex-col justify-start gap-2 p-4">
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h2 className="text-sm text-muted-foreground">Welcome back,</h2>
          <AvatarContainer variant='user' label={{ show: true }} />
        </div>
        <SearchBar />
      </div>
      <>
        <h2 className="text-2xl font-bold">For You</h2>
        {
          (charactersLoading || chatHistoryLoading) && <CarouselSkeleton />
        }
        {
          (forYouCharacters.length > 0 && !chatHistoryLoading) && (
            <CharactersCarousel characters={forYouCharacters} />
          )
        }
      </>

      <>
        <h2 className="text-2xl font-bold">Chat History</h2>
        {
          chatHistoryLoading && <CarouselSkeleton />
        }
        {
          (chatHistory.length > 0 && !chatHistoryLoading) && (
            <ChatHistoryCarousel chatHistory={chatHistory} />
          )
        }
      </>
    </div>
  )
}