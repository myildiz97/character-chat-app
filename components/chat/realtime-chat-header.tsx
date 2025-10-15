import { ICharacterDB } from '@/lib/types/character'
import { BackButton } from '../shared/back-button';
import { AvatarContainer } from '../shared/avatar-container';
import { CustomHeading } from '../ui/custom/custom-heading';
import { CustomText } from '../ui/custom/custom-text';

interface IRealtimeChatHeaderProps {
  character: ICharacterDB;
}

export const RealtimeChatHeader = ({ character }: IRealtimeChatHeaderProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 w-screen h-20 z-1 backdrop-blur-xl border-b border-border flex p-4'>
      <div className='w-full max-w-5xl mx-auto flex items-center justify-between gap-4'>
        <BackButton href={`/chat`} label="Back to Chats" />
        <div className='flex items-center gap-4 mr-auto ml-4 md:mr-0 md:ml-0'>
          <AvatarContainer
            src={character.avatar_url || ""}
            alt={character.name}
            name={character.name}
            variant='character'
            className='aspect-square object-cover sm:object-contain'
            width={40}
            height={40}
          />
          <div className='w-full flex flex-col mx-auto'>
            <CustomHeading variant='h4'>{character.name}</CustomHeading>
            <CustomText variant='span'>By @{character.created_by}</CustomText>
          </div>
        </div>
      </div>
    </div>
  )
}