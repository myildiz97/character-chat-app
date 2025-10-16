import { ChatPageContent } from '@/components/pages/chat-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chat | Character Chat App",
  description: "Chat with your favorite characters in real-time",
};

export default function ChatPage() {
  return <ChatPageContent />
}