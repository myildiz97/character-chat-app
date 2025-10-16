"use client"

import { useCharacters } from '@/hooks/use-characters';
import CharacterSelect from './character-select';
import CharacterSelectSkeleton from './character-select-skeleton';
import { COLOR_PALETTE } from '@/lib/constants/character';
import { CustomHeading } from '../ui/custom/custom-heading';
import { CustomText } from '../ui/custom/custom-text';

export function CharactersContainer() {
  const { characters: existingCharacters, isLoading: charactersLoading } = useCharacters();

  const characters = existingCharacters.map((character) => ({
    ...character,
    color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
  }));

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden'>
      <div className='flex flex-col items-center justify-center gap-1 px-2'>
        <CustomHeading variant='h2'>👋 Welcome!</CustomHeading>
        <CustomText variant='p' className='text-center'>Who would you like to chat with today?</CustomText>
        <CustomText variant='span' className='text-center'>Select a character to start chatting with</CustomText>
      </div>
      {
        charactersLoading ? (
          <CharacterSelectSkeleton />
        ): characters.length > 0 ? (
          <CharacterSelect characters={characters} />
        ): <CustomText variant='p' className='text-center'>It seems like we don&apos;t have any characters available. Please try again later.</CustomText>
      }
    </div>
  )
}