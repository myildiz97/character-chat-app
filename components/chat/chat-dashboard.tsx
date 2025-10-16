"use client"

import { useCharacters } from '@/hooks/use-characters';
import { useChatHistory } from '@/hooks/use-chat-history';
import CharactersCarousel from '../character/characters-carousel';
import { ChatHistoryCarousel } from './chat-history-carousel';
import { SearchBar } from '../shared/search-bar';
import CarouselSkeleton from '../shared/carousel-skeleton';
import { AvatarContainer } from '../shared/avatar-container';
import { CustomText } from '../ui/custom/custom-text';
import { cn } from '@/lib/utils';
import { CustomHeading } from '../ui/custom/custom-heading';
import Link from 'next/link';

export function ChatsDashboard() {
  const { characters, isLoading: charactersLoading } = useCharacters();
  const { chatHistory, isLoading: chatHistoryLoading } = useChatHistory();

  const existingCharacters = chatHistory.map((chat) => chat.character.id);
  const forYouCharacters = characters.filter((character) => !existingCharacters.includes(character.id));

  return (
    <div className="w-full flex flex-col justify-start gap-4 px-4 pb-4">
      <div className='flex items-center justify-between'>
        <div className='w-full hidden md:flex flex-col items-start gap-2'>
          <CustomText variant='span'>Welcome back,</CustomText>
          <AvatarContainer variant='user' label={{ show: true, type: 'long' }} className='ml-2' />
        </div>
        <SearchBar />
      </div>
      <div className={cn('w-full flex-col items-start gap-2', (forYouCharacters.length === 0 && !chatHistoryLoading && !charactersLoading) ? 'hidden' : 'flex')}>
        <CustomHeading variant='h2'>Try These</CustomHeading>
        {
          (charactersLoading || chatHistoryLoading) ? <CarouselSkeleton /> : (
            (forYouCharacters.length > 0 && !chatHistoryLoading) ? (
              <CharactersCarousel characters={forYouCharacters} />
            ) : null
          )
        }
      </div>

      <div className='w-full flex flex-col items-start gap-2'>
        <CustomHeading variant='h2'>Chat History</CustomHeading>
        {
          chatHistoryLoading ? <CarouselSkeleton /> : (
            (chatHistory.length > 0 && !chatHistoryLoading) ? (
              <ChatHistoryCarousel chatHistory={chatHistory} />
            ) : <CustomText variant='p' className='text-left w-full'>
              No chats yet! 💬
              Start a new conversation with one of the characters in the “Try These” section, or pick your favorite from <Link href="/characters" className="text-primary underline hover:text-primary/80">here</Link>.
            </CustomText>
          )
        }
      </div>
    </div>
  )
}