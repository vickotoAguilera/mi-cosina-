'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, UserRole, User, CartItem, BrandingConfig } from '@/types';
import { AppFeatures, INITIAL_FEATURES } from '@/config/appFeatures';

const INITIAL_BRANDING: BrandingConfig = {
  primaryColor: '#8a4b38',
  backgroundColor: '#fdfaf5',
  borderRadius: 24,
  logoUrl: '',
};

interface AppContextType {
  role: UserRole;
  user: User | null;
  cart: CartItem[];
  menu: MenuItem[];
  features: AppFeatures;
  branding: BrandingConfig;
  isCartOpen: boolean;
  subtotal: number;
  iva: number;
  total: number;
  theme: Theme;
  setRole: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  setMenu: (menu: MenuItem[]) => void;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  rotateRole: () => void;
  updateProduct: (product: MenuItem) => void;
  updateFeature: (key: keyof AppFeatures, value: boolean) => void;
  updateBranding: (branding: Partial<BrandingConfig>) => void;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('GUEST');
  const [user, setUserState] = useState<User | null>(null);
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [menu, setMenuState] = useState<MenuItem[]>([]);
  const [features, setFeaturesState] = useState<AppFeatures>(INITIAL_FEATURES);
  const [branding, setBrandingState] = useState<BrandingConfig>(INITIAL_BRANDING);
  const [isCartOpen, setCartOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>('light');
  const [isHydrated, setIsHydrated] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedRole = localStorage.getItem('mc_role') as UserRole;
    const savedUser = localStorage.getItem('mc_user');
    const savedCart = localStorage.getItem('mc_cart');
    const savedFeatures = localStorage.getItem('mc_features');
    const savedBranding = localStorage.getItem('mc_branding');
    const savedTheme = localStorage.getItem('mc_theme') as Theme;

    if (savedRole) setRoleState(savedRole);
    if (savedUser) setUserState(JSON.parse(savedUser));
    if (savedCart) setCartState(JSON.parse(savedCart));
    if (savedFeatures) setFeaturesState(JSON.parse(savedFeatures));
    if (savedBranding) setBrandingState(JSON.parse(savedBranding));
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('mc_role', role);
      if (user) {
        localStorage.setItem('mc_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('mc_user');
      }
      localStorage.setItem('mc_cart', JSON.stringify(cart));
      localStorage.setItem('mc_features', JSON.stringify(features));
      localStorage.setItem('mc_branding', JSON.stringify(branding));
      localStorage.setItem('mc_theme', theme);
    }
  }, [role, user, cart, features, branding, theme, isHydrated]);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const newIva = newSubtotal * 0.19;
    const newTotal = newSubtotal + newIva;
    setSubtotal(newSubtotal);
    setIva(newIva);
    setTotal(newTotal);
  }, [cart]);

  const rotateRole = () => {
    const roles: UserRole[] = ['GUEST', 'USER', 'ADMIN'];
    const currentIndex = roles.indexOf(role);
    const nextIndex = (currentIndex + 1) % roles.length;
    setRoleState(roles[nextIndex]);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return newTheme;
    });
  };

  const addToCart = (newItem: CartItem) => {
    if (!features.enableCart) return;
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

  const updateFeature = (key: keyof AppFeatures, value: boolean) => {
    setFeaturesState(prev => ({ ...prev, [key]: value }));
  };

  const updateBranding = (newBranding: Partial<BrandingConfig>) => {
    setBrandingState(prev => ({ ...prev, ...newBranding }));
  };

  return (
    <AppContext.Provider value={{ 
      role, 
      user,
      cart, 
      menu,
      features,
      branding,
      isCartOpen, 
      subtotal,
      iva,
      total,
      theme,
      setRole: setRoleState,
      setUser: setUserState, 
      setMenu: setMenuState,
      setCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      rotateRole,
      updateProduct,
      updateFeature,
      updateBranding,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}
