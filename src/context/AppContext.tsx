'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, MENU_MOCK } from '@/constants/mockData';

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
  menu: MenuItem[];
  isCartOpen: boolean;
  setRole: (role: UserRole) => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  rotateRole: () => void;
  updateProduct: (product: MenuItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('GUEST');
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [menu, setMenuState] = useState<MenuItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('mc_role') as UserRole;
    const savedCart = localStorage.getItem('mc_cart');
    const savedMenu = localStorage.getItem('mc_menu');

    if (savedRole) setRoleState(savedRole);
    if (savedCart) setCartState(JSON.parse(savedCart));
    if (savedMenu) {
      setMenuState(JSON.parse(savedMenu));
    } else {
      setMenuState(MENU_MOCK);
    }
    
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('mc_role', role);
      localStorage.setItem('mc_cart', JSON.stringify(cart));
      localStorage.setItem('mc_menu', JSON.stringify(menu));
    }
  }, [role, cart, menu, isHydrated]);

  const rotateRole = () => {
    const roles: UserRole[] = ['GUEST', 'USER', 'ADMIN'];
    const currentIndex = roles.indexOf(role);
    const nextIndex = (currentIndex + 1) % roles.length;
    setRoleState(roles[nextIndex]);
  };

  const addToCart = (newItem: CartItem) => {
    setCartState(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, newItem];
    });
    setCartOpen(true);
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

  const updateProduct = (updatedProduct: MenuItem) => {
    setMenuState(prev => prev.map(item => item.id === updatedProduct.id ? updatedProduct : item));
  };

  return (
    <AppContext.Provider value={{ 
      role, 
      cart, 
      menu,
      isCartOpen, 
      setRole: setRoleState, 
      setCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      rotateRole,
      updateProduct
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
