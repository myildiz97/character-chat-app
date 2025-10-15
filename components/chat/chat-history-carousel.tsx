"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { IChatMessageHistory } from '@/lib/types/chat';
import { truncateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ChatHistoryCarouselProps {
  chatHistory: IChatMessageHistory[];
}

export function ChatHistoryCarousel({ chatHistory }: ChatHistoryCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className='w-[90%] sm:w-[30%] h-[146px]'>
        {chatHistory.map((chat, index) => (
          <CarouselItem key={index}>
            <CharactersCarouselItem chat={chat} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  )
}

export function CharactersCarouselItem({ chat }: { chat: IChatMessageHistory }) {
  return (
    <Link href={`/chat/${chat.character.id}`} className='w-full h-full flex gap-x-3 bg-secondary rounded-2xl p-4'>
      <CharactersCarouselItemImage chat={chat} />
      <div className='w-full h-full flex flex-col gap-2'>
        <h3 className='text-lg font-bold'>{chat.character.name}</h3>
        <p className='text-sm text-muted-foreground'>{truncateString(chat.lastMessage || '')}</p>
      </div>
    </Link>
  )
}

export function CharactersCarouselItemImage({ chat }: { chat: IChatMessageHistory }) {
  return (
    <div className= 'relative w-full min-w-[50%] h-full flex items-center justify-center aspect-square rounded-3xl overflow-hidden'>
      <Image src={chat.character.avatar_url || ''} alt={chat.character.name} fill className='object-cover sm:object-contain' unoptimized />
    </div>
  )
}