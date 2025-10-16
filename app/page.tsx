import HomePage from '@/components/pages/home-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Character Chat App",
  description: "Chat with your favorite characters",
};

export default function Home() {
  return <HomePage />
}