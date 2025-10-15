import { AppContainer } from '@/components/layouts/app-container';
import { BottomNavigation } from '@/components/layouts/bottom-navigation';
import ProtectedLayout from '@/components/layouts/protected-layout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <AppContainer>
        {children}
        <BottomNavigation />
      </AppContainer>
    </ProtectedLayout>
  )
}