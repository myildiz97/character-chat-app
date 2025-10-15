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

interface CharactersCarouselProps {
  characters: ICharacterDB[];
}

export default function CharactersCarousel({ characters }: CharactersCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className='w-[94%] sm:w-[30%] h-[146px]'>
        {characters.map((character, index) => (
          <CarouselItem key={index}>
            <CharactersCarouselItem character={character} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  )
}

export function CharactersCarouselItem({ character }: { character: ICharacterDB }) {
  return (
    <Link href={`/chat/${character.id}`} className='w-full h-full flex justify-between gap-x-3 bg-secondary rounded-2xl p-4'>
      <CharactersCarouselItemImage character={character} />
      <div className='w-full h-full flex flex-col gap-1'>
        <h3 className='font-bold'>{character.name}</h3>
        <span className='text-xs text-muted-foreground'>By @{character.created_by}</span>
        <p className='text-xs'>{truncateString(character.short_description)}</p>
      </div>
    </Link>
  )
}

export function CharactersCarouselItemImage({ character }: { character: ICharacterDB }) {
  return (
    <div className= 'relative w-full min-w-[40%] h-full flex items-center justify-center aspect-square rounded-3xl overflow-hidden'>
      <Image src={character.avatar_url || ''} alt={character.name} fill className='object-cover sm:object-contain' unoptimized />
    </div>
  )
}