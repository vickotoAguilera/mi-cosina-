'use client';

import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart, UserCog, Settings, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/authProvider';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Navbar() {
  const { cart, rotateRole, setCartOpen, features, branding, role, user, isAuthenticated, loginWithGoogle, logout } = useAuth();
  
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const isAdmin = role === 'ADMIN';

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {branding.logoUrl ? (
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image src={branding.logoUrl} alt="Logo" fill className="object-contain dark:invert" />
            </div>
          ) : (
            <UtensilsCrossed className="w-8 h-8 text-primary transition-transform duration-500 group-hover:rotate-[360deg]" />
          )}
          <span className="font-serif text-2xl lg:text-3xl font-bold text-foreground dark:text-white tracking-tighter">
            Mi Cocina <span className="text-primary italic">Digital</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/#menu" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Menú
          </Link>
          
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
              <Settings className="w-4 h-4" />
              Gestión
            </Link>
          )}
          
          <div className="flex items-center gap-4 border-l pl-10 border-border">
            <ThemeSwitcher />
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border-2 border-primary/50">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button onClick={logout} variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button onClick={loginWithGoogle} variant="outline" className="rounded-full">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar con Google
              </Button>
            )}

            <Badge variant="outline" className="font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 border-primary/20 text-primary">
              {role}
            </Badge>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={rotateRole}
              className="h-9 gap-2 text-xs font-bold rounded-full px-4 border border-border shadow-sm hover:shadow-md transition-all"
            >
              <UserCog className="w-4 h-4" />
              Roles
            </Button>
          </div>

          {features.enableCart && (
            <button 
              onClick={() => setCartOpen(true)}
              className="relative group transition-transform active:scale-90"
            >
              <div className="p-3 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                <ShoppingCart className="w-6 h-6 stroke-1" />
              </div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-background shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>

        {/* Móvil */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeSwitcher />
          {features.enableCart && (
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 stroke-1" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          )}
          <Button variant="ghost" size="sm" onClick={rotateRole} className="text-[10px] font-bold h-9 px-3 border border-border rounded-full">
            {role}
          </Button>
        </div>
      </div>
    </nav>
  );
}
