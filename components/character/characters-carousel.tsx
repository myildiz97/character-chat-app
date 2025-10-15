"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ICharacterDB } from '@/lib/types/character';
import Image from 'next/image';
import { truncateString } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CharactersCarouselProps {
  characters: ICharacterDB[];
}

export default function CharactersCarousel({ characters }: CharactersCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-[94%] sm:w-[30%] h-[200px]">
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
        className="w-full h-full flex justify-between gap-x-3 bg-secondary rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CharactersCarouselItemImage character={character} />
        <motion.div
          className="w-full h-full flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="font-bold">{character.name}</h3>
          <span className="text-xs text-muted-foreground">By @{character.created_by}</span>
          <p className="text-xs">{truncateString(character.short_description)}</p>
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
      <Image
        src={character.avatar_url || ""}
        alt={character.name}
        fill
        className="aspect-square object-cover sm:object-contain"
        unoptimized
      />
    </motion.div>
  )
}
