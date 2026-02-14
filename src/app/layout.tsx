'use client';

import './globals.css';
import { Navbar } from '@/components/navbar';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import { CartDrawer } from '@/components/CartDrawer';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

function BrandingWrapper({ children }: { children: React.ReactNode }) {
  const { branding } = useAppContext();
  const pathname = usePathname();

  return (
    <body 
      style={{ 
        '--primary': branding.primaryColor,
        '--background': branding.backgroundColor,
        '--radius-custom': `${branding.borderRadius}px`,
      } as React.CSSProperties}
      className="font-body antialiased selection:bg-primary/30 min-h-screen flex flex-col no-scrollbar"
    >
      <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <div key={pathname}>
              {children}
            </div>
          </AnimatePresence>
        </main>
      <footer className="bg-accent text-accent-foreground py-16 border-t border-white/5 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="font-serif text-3xl font-bold mb-4 tracking-tighter">Mi Cocina Digital</p>
          <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-6"></div>
          <p className="opacity-50 text-xs uppercase tracking-[0.3em] font-bold">© {new Date().getFullYear()} — Excelencia Gastronómica</p>
        </div>
      </footer>
      <CartDrawer />
      <Toaster />
    </body>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <title>Mi Cocina Digital | Premium</title>
      </head>
      <AppProvider>
        <BrandingWrapper>{children}</BrandingWrapper>
      </AppProvider>
    </html>
  );
}