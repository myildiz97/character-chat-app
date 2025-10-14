import ProtectedLayout from '@/components/layouts/protected-layout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      {children}
    </ProtectedLayout>
  )
}