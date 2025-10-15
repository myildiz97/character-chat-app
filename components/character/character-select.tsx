"use client";

import { motion, } from "framer-motion";
import { ICharacterDB } from '@/lib/types/character';
import TargetCursor from '../shared/TargetCursor';
import Link from 'next/link';
interface ICharacterSelectProps extends ICharacterDB {
  color: string;
}
interface CharacterSelectProps {
  characters: ICharacterSelectProps[];
}

export default function CharacterSelect({ characters }: CharacterSelectProps) {
  return (
    <>
      <div className="relative md:hidden flex flex-col items-center justify-center overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 sm:p-6 sm:gap-4">
          {characters.map((char) => <CharacterCard key={char.id} character={char} />)}
        </div>
      </div>
      <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden ">
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 sm:p-6 sm:gap-4">
          {characters.map((char) => <CharacterCard key={char.id} character={char} />)}
        </div>
      </div>
    </>
  );
}

interface CharacterCardProps {
  character: ICharacterSelectProps;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative cursor-target overflow-hidden rounded-3xl bg-secondary backdrop-blur-2xl`}
    >
      <Link href={`/chat/${character.id}`}>
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${character.color}22, transparent 70%)`,
          }}
        />
        <div className="flex flex-col items-center gap-2 p-6 relative z-10">
          <motion.img
            src={character.avatar_url}
            alt={character.name}
            className="w-20 h-20 rounded-full shadow-md"
            whileHover={{ scale: 1.1, rotate: [0, 1, -1, 0] }}
            transition={{ duration: 0.5 }}
          />
          <h3 className="text-xl font-semibold">{character.name}</h3>
          <span className="text-sm text-muted-foreground -mt-3">By @{character.created_by}</span>
          <p className="text-center">
            {character.short_description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};