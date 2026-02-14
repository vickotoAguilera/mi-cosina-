
'use client';

import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart, Menu as MenuIcon, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { role, cart, rotateRole } = useAppContext();
  
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="w-7 h-7 lg:w-8 lg:h-8 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-headline text-xl lg:text-2xl font-bold text-foreground">
            Mi Cocina <span className="text-primary italic">Digital</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/menu" className="font-medium hover:text-primary transition-colors">
            Menú
          </Link>
          
          <div className="flex items-center gap-2 border-l pl-6 border-border">
            <Badge variant="outline" className="font-bold text-[10px] uppercase tracking-wider">
              {role}
            </Badge>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={rotateRole}
              className="h-8 gap-2 text-xs font-bold"
            >
              <UserCog className="w-3.5 h-3.5" />
              Cambiar Rol
            </Button>
          </div>

          <Link href="/carrito" className="relative group ml-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-background">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link href="/carrito" className="relative group">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-background">
                {totalItems}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="sm" onClick={rotateRole} className="text-[10px] font-bold h-8 border border-border px-2 rounded-full">
            {role}
          </Button>
        </div>
      </div>
    </nav>
  );
}
