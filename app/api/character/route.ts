import { CHARACTERS_TABLE } from '@/lib/constants/chat';
import { ICharacterDB } from '@/lib/types/character';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url);

  // Extract query params
  const characterId = searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json(
      { error: "Character ID is required" },
      { status: 400 }
    )
  }

  const { data: character, error: characterError } = await supabase
    .from(CHARACTERS_TABLE)
    .select("*")
    .eq("id", characterId)
    .single()

  if (characterError || !character) {
    return NextResponse.json(
      { error: "Character not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(character as ICharacterDB)
}