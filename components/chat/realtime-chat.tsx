"use client"

import { useChatScroll } from '@/hooks/use-chat-scroll';
import { useRealtimeChat } from '@/hooks/use-realtime-chat';
import { IChatMessage } from '@/lib/types/chat';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatMessageItem, ChatMessageItemWaitingForResponse } from './chat-message-item';
import { ICharacterDB } from '@/lib/types/character';
import { RealtimeChatIntro } from './realtime-chat-intro';
import RealtimeChatInput from './realtime-chat-input';
import { motion } from 'framer-motion';
import { ChatBottomButton } from './chat-bottom-button';

interface IRealtimeChatProps {
  character: ICharacterDB;
  messages?: IChatMessage[];
  onMessage?: (content: string) => void;
}

export function RealtimeChat({ character, messages: initialMessages = [], onMessage }: IRealtimeChatProps) {
  const { containerRef, scrollToBottom } = useChatScroll();

  const { messages: realtimeMessages, sendMessage, isConnected, waitingForResponse } = useRealtimeChat({ characterId: character.id });

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
    <div className="relative flex flex-col h-full w-full max-w-3xl bg-background text-foreground antialiased overflow-x-hidden pt-14 max-h-[80vh] md:max-h-[85vh]">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        <RealtimeChatIntro character={character} />
        {allMessages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-1">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null
            const showHeader = !prevMessage || prevMessage?.role !== message?.role
            return (
              <motion.div 
                key={message?.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
              >
                <ChatMessageItem
                  message={message}
                  character={character}
                  isOwnMessage={message.role === 'user'}
                  showHeader={showHeader}
                />
              </motion.div>
            )
            })}
            {waitingForResponse && <ChatMessageItemWaitingForResponse />}
        </div>
      </div>
    
      <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-border p-4 relative">
        <ChatBottomButton scrollContainerRef={containerRef} />
        <RealtimeChatInput
          disabled={!isConnected || waitingForResponse}
          value={newMessage}
          onChange={(value) => setNewMessage(value)}
        />
      </form>
    </div>
  )
}