import { RealtimeChatContainer } from '../chat/realtime-chat-container';

interface ICharacterChatPageContentProps {
  characterId: string;
}

export function CharacterChatPageContent({ characterId }: ICharacterChatPageContentProps) {
  return <RealtimeChatContainer characterId={characterId} />
}