"use client";

import { motion, } from "framer-motion";
import { ICharacterDB } from '@/lib/types/character';
import Link from 'next/link';
import { CustomHeading } from '../ui/custom/custom-heading';
import { CustomText } from '../ui/custom/custom-text';
import { AvatarContainer } from '../shared/avatar-container';
import CharactersCarousel from './characters-carousel';
interface ICharacterSelectItem extends ICharacterDB {
  color: string;
}
interface ICharacterSelectProps {
  characters: ICharacterSelectItem[];
}

export default function CharacterSelect({ characters }: ICharacterSelectProps) {
  return (
    <>
      <CharactersCarousel characters={characters} className='sm:hidden p-2' />
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 sm:p-6 sm:gap-4 sm:max-h-full sm:overflow-y-hidden">
        {characters.map((char) => <CharacterCard key={char.id} character={char} />)}
      </div>
    </>
  );
}

interface ıCharacterCardProps {
  character: ICharacterSelectItem;
}

const CharacterCard = ({ character }: ıCharacterCardProps) => {
  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative overflow-hidden rounded-3xl bg-secondary backdrop-blur-2xl`}
    >
      <Link href={`/chat/${character.id}`}>
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${character.color}22, transparent 70%)`,
          }}
        />
        <div className="flex flex-col items-center gap-2 p-6 relative z-10">
          <AvatarContainer src={character.avatar_url} alt={character.name} name={character.name} />
          <CustomHeading variant='h3'>{character.name}</CustomHeading>
          <CustomText variant='span' className='-mt-3'>By @{character.created_by}</CustomText>
          <CustomText variant='p' className='text-center'>{character.short_description}</CustomText>
        </div>
      </Link>
    </motion.div>
  );
};