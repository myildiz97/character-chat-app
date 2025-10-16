"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ICharacterDB } from '@/lib/types/character';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CustomHeading } from '../ui/custom/custom-heading';
import { CustomText } from '../ui/custom/custom-text';
import { AvatarContainer } from '../shared/avatar-container';
import { cn } from '@/lib/utils';

interface CharactersCarouselProps {
  characters: ICharacterDB[];
  className?: string;
}

export default function CharactersCarousel({ characters, className }: CharactersCarouselProps) {
  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent className="w-[280px] sm:w-[400px] h-full">
        {characters.map((character, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <CharactersCarouselItem character={character} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}

export function CharactersCarouselItem({ character }: { character: ICharacterDB }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link
        href={`/chat/${character.id}`}
        className="w-full h-60 flex justify-between gap-x-3 bg-secondary rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CharactersCarouselItemImage character={character} />
        <motion.div
          className="w-full h-full flex flex-col gap-1 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CustomHeading variant='h3'>{character.name}</CustomHeading>
          <CustomText variant='span'>By @{character.created_by}</CustomText>
          <CustomText variant='p' className='truncate line-clamp-2 text-ellipsis'>{character.short_description}</CustomText>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function CharactersCarouselItemImage({ character }: { character: ICharacterDB }) {
  return (
    <motion.div
      className="relative w-full min-w-[40%] h-full flex items-center justify-center aspect-square rounded-3xl overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <AvatarContainer
        src={character.avatar_url || ""}
        alt={character.name}
        name={character.name}
        variant='character'
      />
    </motion.div>
  )
}
