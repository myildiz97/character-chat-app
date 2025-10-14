import { LoginCard } from '../auth/login-card';
import { HomeBgVideo } from '../shared/home-bg-video';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <HomeBgVideo />
      <LoginCard />
    </main>
  )
}