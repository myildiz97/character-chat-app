import { LOCAL_STORAGE_KEY_CHARACTERS } from '@/lib/constants/chat';
import { ICharacterDB } from '@/lib/types/character';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';


export function useCharacters() {
  const [characters, setCharacters] = useState<ICharacterDB[]>([]);

  const fetchCharacters = useCallback(async () => {
    try {
      const charactersFromLocalStorage = getFromLocalStorage(LOCAL_STORAGE_KEY_CHARACTERS);
      if (charactersFromLocalStorage.length > 0) {
        setCharacters(charactersFromLocalStorage);
        return;
      }
      const charactersResponse = await fetch('/api/character');
      if (!charactersResponse.ok) {
        throw new Error('Failed to fetch characters');
      }
      const characters = await charactersResponse.json() as ICharacterDB[];
      setCharacters(characters);
      saveToLocalStorage(LOCAL_STORAGE_KEY_CHARACTERS, characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { characters, setCharacters };
}