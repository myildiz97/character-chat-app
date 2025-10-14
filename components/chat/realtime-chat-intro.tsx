import { ICharacterDB } from '@/lib/types/character';
import Image from 'next/image';

interface IRealtimeChatIntroProps {
  character: ICharacterDB;
}

export const RealtimeChatIntro = ({ character }: IRealtimeChatIntroProps) => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-1 px-16 pb-6 pt-20'>
      <Image src={character.avatar_url || ''} alt={character.name} width={64} height={64} className='rounded-full' unoptimized />
      <h1 className='text-2xl font-bold'>{character.name}</h1>
      <p className='text-sm text-muted-foreground'>Short description about the character</p>
    </div>
  )
}