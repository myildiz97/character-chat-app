export interface ICharacter {
  name: string;
  avatar_url: string;
  description: string;
  system_prompt: string;
  short_description: string;
  opening_message: string;
  created_by: string;
}

export interface ICharacterDB extends ICharacter {
  id: string
  created_at: string
  updated_at: string
}