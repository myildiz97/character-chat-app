import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UserProvider } from '../context/user-context';

interface IProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: IProtectedLayoutProps) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <UserProvider user={user}>{children}</UserProvider>;
}
