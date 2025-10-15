"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { IChatMessageHistory } from '@/lib/types/chat';
import { truncateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ChatHistoryCarouselProps {
  chatHistory: IChatMessageHistory[];
}

export function ChatHistoryCarousel({ chatHistory }: ChatHistoryCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className='w-[90%] sm:w-[30%] h-[200px]'>
        {chatHistory.map((chat, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <CharactersCarouselItem chat={chat} />
            </motion.div>
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
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link href={`/chat/${chat.character.id}`} className='w-full h-full flex gap-x-3 bg-secondary rounded-2xl p-4'>
        <CharactersCarouselItemImage chat={chat} />
        <motion.div
          className="w-full h-full flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className='text-lg font-bold'>{chat.character.name}</h3>
          <p className='text-sm text-muted-foreground'>{truncateString(chat.lastMessage || '')}</p>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function CharactersCarouselItemImage({ chat }: { chat: IChatMessageHistory }) {
  return (
    <motion.div 
      className= 'relative w-full min-w-[40%] h-full flex items-center justify-center aspect-square rounded-3xl overflow-hidden'
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <Image 
        src={chat.character.avatar_url || ''} 
        alt={chat.character.name} 
        fill 
        className='aspect-square object-cover sm:object-contain' 
        unoptimized 
      />
    </motion.div>
  )
}