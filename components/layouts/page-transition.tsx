export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-dvh flex-col relative overflow-hidden mx-auto">{children}</main>
}
