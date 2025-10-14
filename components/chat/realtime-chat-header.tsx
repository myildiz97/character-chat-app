import { ICharacterDB } from '@/lib/types/character'
import Image from 'next/image';

interface IRealtimeChatHeaderProps {
  character: ICharacterDB;
}

export const RealtimeChatHeader = ({ character }: IRealtimeChatHeaderProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 w-screen h-20 z-1 backdrop-blur-xl border-b border-border flex items-center gap-4 p-4'>
      <Image src={character.avatar_url || ''} alt={character.name} width={40} height={40} className='rounded-full' unoptimized />
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>{character.name}</h1>
        <p className='text-sm text-muted-foreground'>Short description about the character</p>
      </div>
    </div>
  )
}