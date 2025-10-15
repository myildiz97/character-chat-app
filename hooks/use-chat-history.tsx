import { CHAT_MESSAGES_TABLE, EVENT_CHAT_HISTORY_TYPE } from '@/lib/constants/chat';
import { IChatMessageHistory } from '@/lib/types/chat';
import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useChatHistory() {
  const supabase = createClient();
  const [chatHistory, setChatHistory] = useState<IChatMessageHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const filteredChatHistory = useCallback((chatHistoryToFilter: IChatMessageHistory[] = []) => {
    if (searchQuery) {
      return chatHistoryToFilter.filter((chatMessageHistory) => chatMessageHistory.character.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return chatHistoryToFilter;
  }, [searchQuery]);

  const fetchChatMessageHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const chatMessageHistoryResponse = await fetch('/api/chat/history');
      if (!chatMessageHistoryResponse.ok) {
        throw new Error('Failed to fetch chat message history');
      }
      const chatMessageHistory = await chatMessageHistoryResponse.json() as IChatMessageHistory[];
      setChatHistory(filteredChatHistory(chatMessageHistory)); 
    } catch (error) {
      console.error('Error fetching chat message history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filteredChatHistory]);

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
  

  return { chatHistory, setChatHistory, isLoading };
}