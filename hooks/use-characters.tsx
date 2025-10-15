import { LOCAL_STORAGE_KEY_CHARACTERS } from '@/lib/constants/character';
import { ICharacterDB } from '@/lib/types/character';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useCharacters() {
  const [characters, setCharacters] = useState<ICharacterDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const filteredCharacters = useCallback((charactersToFilter: ICharacterDB[] = []) => {
    if (searchQuery) {
      return charactersToFilter.filter((character) => character.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return charactersToFilter;
  }, [searchQuery]);

  const fetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      let charactersFromLocalStorage = getFromLocalStorage(LOCAL_STORAGE_KEY_CHARACTERS);
      if (charactersFromLocalStorage.length > 0) {
        if (searchQuery) {
          charactersFromLocalStorage = charactersFromLocalStorage.filter((character: ICharacterDB) => character.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setCharacters(filteredCharacters(charactersFromLocalStorage));
        return;
      }
      const charactersResponse = await fetch('/api/character');
      if (!charactersResponse.ok) {
        throw new Error('Failed to fetch characters');
      }
      const characters = await charactersResponse.json() as ICharacterDB[];
      setCharacters(filteredCharacters(characters));
      saveToLocalStorage(LOCAL_STORAGE_KEY_CHARACTERS, characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filteredCharacters, searchQuery]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { characters, setCharacters, isLoading };
}