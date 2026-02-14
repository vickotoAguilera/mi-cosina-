'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'GUEST' | 'USER' | 'ADMIN';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface AppContextType {
  role: UserRole;
  cart: CartItem[];
  isCartOpen: boolean;
  setRole: (role: UserRole) => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  rotateRole: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('GUEST');
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('mc_role') as UserRole;
    const savedCart = localStorage.getItem('mc_cart');

    if (savedRole) setRoleState(savedRole);
    if (savedCart) setCartState(JSON.parse(savedCart));
    
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('mc_role', role);
      localStorage.setItem('mc_cart', JSON.stringify(cart));
    }
  }, [role, cart, isHydrated]);

  const setRole = (newRole: UserRole) => setRoleState(newRole);

  const rotateRole = () => {
    const roles: UserRole[] = ['GUEST', 'USER', 'ADMIN'];
    const currentIndex = roles.indexOf(role);
    const nextIndex = (currentIndex + 1) % roles.length;
    setRole(roles[nextIndex]);
  };

  const addToCart = (newItem: CartItem) => {
    setCartState(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, newItem];
    });
    setCartOpen(true); // Abrir automáticamente al añadir
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartState(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.cantidad + delta);
        return { ...item, cantidad: newQty };
      }
      return item;
    }).filter(item => item.cantidad > 0));
  };

  const removeFromCart = (id: string) => {
    setCartState(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCartState([]);

  return (
    <AppContext.Provider value={{ 
      role, 
      cart, 
      isCartOpen, 
      setRole, 
      setCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      rotateRole 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
}
