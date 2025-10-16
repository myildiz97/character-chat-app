import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import PageTransition from '@/components/layouts/page-transition';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Character Chat App",
  description: "Chat with your favorite characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader 
            showSpinner={false}
          />
          <PageTransition>
            {children}
            <Toaster />
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
