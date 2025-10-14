export type IChatMessageRole = "user" | "assistant" | "system"

export interface IChatMessage {
  id: string
  user_id: string
  character_id: string
  role: IChatMessageRole
  content: string
  created_at: string
}

export interface IChatMessageCore {
  role: IChatMessageRole
  content: string
}