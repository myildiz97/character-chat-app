"use client"

import { useChatScroll } from '@/hooks/use-chat-scroll';
import { useRealtimeChat } from '@/hooks/use-realtime-chat';
import { IChatMessage } from '@/lib/types/chat';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessageItem } from './chat-message-item';

interface IRealtimeChatProps {
  characterId: string;
  messages?: IChatMessage[];
  onMessage?: (content: string) => void;
}

export function RealtimeChat({ characterId, messages: initialMessages = [], onMessage }: IRealtimeChatProps) {
  const { containerRef, scrollToBottom } = useChatScroll();

  const { messages: realtimeMessages, sendMessage, isConnected } = useRealtimeChat({ characterId });

  const [newMessage, setNewMessage] = useState('');

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages];
    const uniqueMessages = mergedMessages.filter((message, index, self) =>
      index === self.findIndex((t) => t?.id === message?.id)
    );
    const sortedMessages = uniqueMessages.sort((a, b) => a.created_at.localeCompare(b.created_at));
    return sortedMessages;
  }, [initialMessages, realtimeMessages]);


  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);
  
  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!newMessage.trim() || !isConnected) return

      sendMessage(newMessage)
      setNewMessage('')
      onMessage?.(newMessage);
    },
    [newMessage, isConnected, sendMessage, onMessage]
  )

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-1">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null
            const showHeader = !prevMessage || prevMessage?.user_id !== message?.user_id
            return (
              <div
                key={message?.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                  <ChatMessageItem
                    message={message}
                    isOwnMessage={message.role === 'user'}
                    showHeader={showHeader}
                  />
              </div>
                )
            })}
        </div>
      </div>
    
      <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-border p-4">
        <Input
          className={cn(
            'rounded-full bg-background text-sm transition-all duration-300',
            isConnected && newMessage.trim() ? 'w-[calc(100%-36px)]' : 'w-full'
          )}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        {isConnected && newMessage.trim() && (
          <Button
            className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300"
            type="submit"
            disabled={!isConnected}
          >
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </div>
  )
}