"use client"

import { useCharacters } from '@/hooks/use-characters';
import CharacterSelect from './character-select';

export function CharactersContainer() {
  const { characters: existingCharacters } = useCharacters();

  const colorPalette = ["#8b5cf6", "#10b981", "#ef4444", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  const characters = existingCharacters.map((character) => ({
    ...character,
    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
  }));

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>👋 Welcome!</h1>
      <p>Who would you like to chat with today?</p>
      <span className='text-sm text-muted-foreground'>Select a character to start chatting with</span>
      <CharacterSelect characters={characters} />
    </div>
  )
}