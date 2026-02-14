import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Mi Cocina Digital',
  description: 'Sabor tradicional en la palma de tu mano',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-accent text-accent-foreground py-8 border-t border-border mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="font-headline text-xl font-bold mb-2">Mi Cocina Digital</p>
            <p className="opacity-70 text-sm">© {new Date().getFullYear()} - Hecho con amor y tradición.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
