import { CHAT_MESSAGES_TABLE } from '@/lib/constants/chat';
import { CHARACTERS_TABLE } from '@/lib/constants/character';
import { IChatMessage } from '@/lib/types/chat';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { characterId: string } }
) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { characterId } = await params;

  const { data: messageHistory, error: historyError } = await supabase
    .from(CHAT_MESSAGES_TABLE)
    .select("*")
    .eq("user_id", user.id)
    .eq("character_id", characterId)
    .order("created_at", { ascending: true })

  if (historyError) {
    console.error("Error fetching message history:", historyError)
    return NextResponse.json(
      { error: "Failed to fetch message history" },
      { status: 500 }
    )
  }

  let messages = messageHistory;

  if (messages.length === 0) {
    const { data: character, error: characterError } = await supabase
      .from(CHARACTERS_TABLE)
      .select("*")
      .eq("id", characterId)
      .single()

    if (characterError) {
      console.error("Error fetching character:", characterError)
    } else {
      try {
        const { data, error } = await supabase
          .from(CHAT_MESSAGES_TABLE)
          .insert({
            user_id: user.id,
            character_id: characterId,
            role: 'assistant',
            content: character.opening_message,
          })
          .select()
          .single();
    
        if (error) {
          console.error("Error saving message:", error)
          return NextResponse.json(
            { error: "Failed to save message" },
            { status: 500 }
          )
        }
    
        messages = [data as IChatMessage];
      } catch (error) {
        console.error("Error saving message:", error)
        return NextResponse.json(
          { error: "Failed to save message" },
          { status: 500 }
        )
      }
    }
  }

  return new Response(
    JSON.stringify({
      messages,
      userId: user.id,
      characterId: characterId,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(
  request: Request, 
  { params }: { params: { characterId: string } }
) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { characterId } = await params;

  const { role, message } = await request.json();

  try {
    const { data, error } = await supabase
      .from(CHAT_MESSAGES_TABLE)
      .insert({
        user_id: user.id,
        character_id: characterId,
        role,
        content: message,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving message:", error)
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      )
    }

    return NextResponse.json(data as IChatMessage)
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    )
  }
}