import { ICharacterDB } from '@/lib/types/character'
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface IRealtimeChatHeaderProps {
  character: ICharacterDB;
}

export const RealtimeChatHeader = ({ character }: IRealtimeChatHeaderProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 w-screen h-20 z-1 backdrop-blur-xl border-b border-border flex items-center gap-4 p-4'>
      <Link href={`/chat`} className='absolute left-4'>
        <ArrowLeft className='size-5' />
      </Link>
      <div className='flex items-center gap-4 mx-auto'>
        <Image src={character.avatar_url || ''} alt={character.name} width={40} height={40} className='rounded-full' unoptimized />
        <div className='w-full flex flex-col mx-auto'>
          <h4 className='text-lg font-bold'>{character.name}</h4>
          <p className='text-sm text-muted-foreground'>By @{character.created_by}</p>
        </div>
      </div>
    </div>
  )
}