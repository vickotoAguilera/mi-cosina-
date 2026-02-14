
/**
 * @fileOverview Datos de ejemplo para el menú de Mi Cocina Digital.
 */

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas';
  imagen: string;
}

export const MENU_MOCK: MenuItem[] = [
  {
    id: '1',
    nombre: 'Paella de la Abuela',
    descripcion: 'Arroz bomba con mariscos frescos, azafrán y el secreto de la casa.',
    precio: 25.50,
    categoria: 'Platos Fuertes',
    imagen: 'https://picsum.photos/seed/paella/600/400'
  },
  {
    id: '2',
    nombre: 'Tacos al Pastor Especiales',
    descripcion: 'Tres tacos con carne marinada, piña, cilantro y cebolla.',
    precio: 12.00,
    categoria: 'Entradas',
    imagen: 'https://picsum.photos/seed/tacos/600/400'
  },
  {
    id: '3',
    nombre: 'Pasta Carbonara Auténtica',
    descripcion: 'Pancetta, huevo, queso pecorino romano y pimienta negra.',
    precio: 18.00,
    categoria: 'Platos Fuertes',
    imagen: 'https://picsum.photos/seed/pasta/600/400'
  },
  {
    id: '4',
    nombre: 'Ensalada César con Pollo Grill',
    descripcion: 'Lechuga romana fresca, crotones, parmesano y aderezo césar.',
    precio: 15.00,
    categoria: 'Entradas',
    imagen: 'https://picsum.photos/seed/salad/600/400'
  },
  {
    id: '5',
    nombre: 'Mousse de Chocolate Amargo',
    descripcion: 'Chocolate 70% cacao con un toque de sal marina y frutos rojos.',
    precio: 8.50,
    categoria: 'Postres',
    imagen: 'https://picsum.photos/seed/mousse/600/400'
  },
  {
    id: '6',
    nombre: 'Limonada de Coco Fresh',
    descripcion: 'Limón recién exprimido mezclado con leche de coco cremosa.',
    precio: 6.00,
    categoria: 'Bebidas',
    imagen: 'https://picsum.photos/seed/lemonade/600/400'
  }
];
