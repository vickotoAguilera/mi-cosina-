import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Mi Cocina <span className="text-primary italic">Digital</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/menu" className="font-medium hover:text-primary transition-colors">
            Menú
          </Link>
          <Link href="/carrito" className="relative group">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-background">
              0
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
