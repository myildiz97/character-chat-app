import { AppContainer } from '@/components/layouts/app-container';
import ProtectedLayout from '@/components/layouts/protected-layout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <AppContainer>
        {children}
      </AppContainer>
    </ProtectedLayout>
  )
}