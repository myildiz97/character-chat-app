export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-screen flex-col relative overflow-hidden mx-auto">{children}</main>
}
