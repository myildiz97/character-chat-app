"use client"

import { useCharacters } from '@/hooks/use-characters';
import { useChatHistory } from '@/hooks/use-chat-history';
import CharactersCarousel from '../character/characters-carousel';
import { ChatHistoryCarousel } from './chat-history-carousel';
import { SearchBar } from '../shared/search-bar';
import CarouselSkeleton from '../shared/carousel-skeleton';
import { useUserContext } from '../context/user-context';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export function ChatsDashboard() {
  const { characters, isLoading: charactersLoading } = useCharacters();
  const { chatHistory, isLoading: chatHistoryLoading } = useChatHistory();
  const { user } = useUserContext();

  const existingCharacters = chatHistory.map((chat) => chat.character.id);
  const forYouCharacters = characters.filter((character) => !existingCharacters.includes(character.id));

  return (
    <div className="w-full flex flex-col justify-start gap-2 p-4">
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h2 className="text-sm text-muted-foreground">Welcome back,</h2>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.name || "User"} />
              <AvatarFallback>{user?.user_metadata?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span>{user?.user_metadata?.name}</span>
          </div>
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