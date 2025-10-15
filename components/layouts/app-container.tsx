export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto pt-2 pb-20'>
      {children}
    </div>
  )
}