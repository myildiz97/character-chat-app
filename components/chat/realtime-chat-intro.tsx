import { ICharacterDB } from '@/lib/types/character';
import { AvatarContainer } from '../shared/avatar-container';
import { CustomHeading } from '../ui/custom/custom-heading';
import { CustomText } from '../ui/custom/custom-text';

interface IRealtimeChatIntroProps {
  character: ICharacterDB;
}

export const RealtimeChatIntro = ({ character }: IRealtimeChatIntroProps) => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-1 px-16 pb-6'>
      <AvatarContainer
        src={character.avatar_url || ""}
        alt={character.name}
        name={character.name}
        variant='character'
        className='rounded-full! aspect-square!'
        width={96}
        height={96}
      />
      <CustomHeading variant='h1'>{character.name}</CustomHeading>
      <CustomText variant='p'>{character.short_description}</CustomText>
      <CustomText variant='span'>By @{character.created_by}</CustomText>
    </div>
  )
}