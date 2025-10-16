import { CHARACTERS_TABLE } from '@/lib/constants/character';
import { ICharacterDB } from '@/lib/types/character';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Check authentication
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // Fetch all available characters
  const { data: characters, error: charactersError } = await supabase
    .from(CHARACTERS_TABLE)
    .select("*")

  if (charactersError) {
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    )
  }

  return NextResponse.json(characters as ICharacterDB[])
}