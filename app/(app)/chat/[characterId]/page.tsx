import { CharacterChatPageContent } from '@/components/pages/character-chat-page';

interface ICharacterChatPageProps {
  params: Promise<{ characterId: string }>
}

export default async function CharacterChatPage({ params }: ICharacterChatPageProps) {
  const { characterId } = await params;

  return <CharacterChatPageContent characterId={characterId} />
}