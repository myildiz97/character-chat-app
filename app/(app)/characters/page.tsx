import { CharactersPageContent } from '@/components/pages/characters-page';
import { Metadata } from 'next';
  
export const metadata: Metadata = {
  title: "Characters | Character Chat App",
  description: "Browse and select your favorite characters",
};

export default function CharactersPage() {
  return (
    <CharactersPageContent />
  )
}