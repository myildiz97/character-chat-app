import { CHAT_MESSAGES_TABLE } from '@/lib/constants/chat';
import { CHARACTERS_TABLE } from '@/lib/constants/character';
import { ICharacterDB } from '@/lib/types/character';
import { IChatMessageHistory } from '@/lib/types/chat';
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

  // Fetch the chat messages for the authenticated user
  const { data: chatMessages, error: chatMessagesError } = await supabase
    .from(CHAT_MESSAGES_TABLE)
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (chatMessagesError) {
    return NextResponse.json(
      { error: chatMessagesError },
      { status: 500 }
    )
  }

  // Get the unique character ids from the chat messages
  const uniqueCharacterIds = [...new Set(chatMessages.map((chatMessage) => chatMessage.character_id))]

  const chatMessageHistory: IChatMessageHistory[] = [];

  // Fetch the character data for each unique character id and build the chat message history
  for (const characterId of uniqueCharacterIds) {
    const chatMessage = chatMessages.find((chatMessage) => chatMessage.character_id === characterId && chatMessage.role === "user")
    if (!chatMessage) continue;

    let character: ICharacterDB | null = null;
    try {
      const { data: characterData, error: characterError } = await supabase
        .from(CHARACTERS_TABLE)
        .select("*")
        .eq("id", characterId)
        .single()

      if (characterError) {
        console.error('Error fetching character:', characterError);
        continue;
      }

      character = characterData;
    } catch (error) {
      console.error('Error fetching character:', error);
      continue;
    }

      chatMessageHistory.push({
        character: character,
        lastMessage: chatMessage.content,
        createdAt: chatMessage.created_at
      } as IChatMessageHistory);
  }

  return NextResponse.json(chatMessageHistory)
}