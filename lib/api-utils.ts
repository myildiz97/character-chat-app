export const API_ROUTES = {
  CHARACTERS: '/api/character',
  CHAT_HISTORY: '/api/chat/history',
  CHAT: '/api/chat',
}

export const handleApiError = (error: any) => {
  if (error.message) {
    return error.message;
  }
  return "An unknown error occurred";
}