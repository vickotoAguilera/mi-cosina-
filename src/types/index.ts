
export type UserRole = 'GUEST' | 'USER' | 'ADMIN';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  picture: string;
}

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

export interface BrandingConfig {
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  logoUrl: string;
}

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOferta?: number;
  activo: boolean;
  categoria: string;
  imagen: string;
}
