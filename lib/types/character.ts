export interface ICharacter {
  name: string
  avatar_url: string | null
  description: string | null
  system_prompt: string
}

export interface ICharacterDB extends ICharacter {
  id: string
  created_at: string
  updated_at: string
}