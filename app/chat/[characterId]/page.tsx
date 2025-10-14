import { CharacterChatPageContent } from '@/components/pages/character-chat-page';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface ICharacterChatPageProps {
  params: Promise<{ characterId: string }>
}

export default async function CharacterChatPage({ params }: ICharacterChatPageProps) {
  const { characterId } = await params;

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return <CharacterChatPageContent characterId={characterId} />
}