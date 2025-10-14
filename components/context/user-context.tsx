'use client';

import { createContext, ReactNode, useContext } from 'react';
import { User } from '@supabase/supabase-js';

interface IUserContext {
  user: User | null;
}

const UserContext = createContext<IUserContext>({ user: null });

interface IUserProviderProps {
  user: User | null;
  children: ReactNode;
}

export function UserProvider({ user, children }: IUserProviderProps) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
