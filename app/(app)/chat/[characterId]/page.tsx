import { CharacterChatPageContent } from '@/components/pages/character-chat-page';

export async function generateMetadata({ params }: { params: Promise<{ characterId: string }> }) {
  const { characterId } = await params;
  // Here normally, we would fetch the character data from the database to get the character name and description.
  // For now, I used id for metadata generation.
  return {
    title: `Chat with ${characterId} | Character Chat App`,
    description: `Chat with your favorite character ${characterId} in real-time`,
  };
}

interface ICharacterChatPageProps {
  params: Promise<{ characterId: string }>
}

export default async function CharacterChatPage({ params }: ICharacterChatPageProps) {
  const { characterId } = await params;

  return <CharacterChatPageContent characterId={characterId} />
}