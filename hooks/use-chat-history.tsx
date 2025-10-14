import { CHAT_MESSAGES_TABLE, EVENT_CHAT_HISTORY_TYPE } from '@/lib/constants/chat';
import { IChatMessageHistory } from '@/lib/types/chat';
import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

export function useChatHistory() {
  const supabase = createClient();
  const [chatHistory, setChatHistory] = useState<IChatMessageHistory[]>([]);

  const fetchChatMessageHistory = useCallback(async () => {
    try {
      const chatMessageHistoryResponse = await fetch('/api/chat/history');
      if (!chatMessageHistoryResponse.ok) {
        throw new Error('Failed to fetch chat message history');
      }
      const chatMessageHistory = await chatMessageHistoryResponse.json() as IChatMessageHistory[];
      setChatHistory(chatMessageHistory); 

    } catch (error) {
      console.error('Error fetching chat message history:', error);
    }
  }, []);

  useEffect(() => {
    fetchChatMessageHistory();
  }, [fetchChatMessageHistory]);

  useEffect(() => {
    const channel = supabase
      .channel(EVENT_CHAT_HISTORY_TYPE)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: CHAT_MESSAGES_TABLE,
      }, () => {
        fetchChatMessageHistory();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [chatHistory, fetchChatMessageHistory, supabase]);
  

  return { chatHistory, setChatHistory };
}