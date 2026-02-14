/**
 * @fileOverview Datos de ejemplo para el menú de Mi Cocina Digital.
 */

import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas';
  imagen: string;
  imageHint: string;
}

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(i => i.id === id);
  return {
    url: img?.imageUrl || 'https://picsum.photos/seed/food/600/400',
    hint: img?.imageHint || 'food'
  };
};

export const MENU_MOCK: MenuItem[] = [
  {
    id: '1',
    nombre: 'Paella de la Abuela',
    descripcion: 'Arroz bomba con mariscos frescos, azafrán y el secreto de la casa.',
    precio: 25.50,
    categoria: 'Platos Fuertes',
    imagen: getImage('dish-paella').url,
    imageHint: getImage('dish-paella').hint
  },
  {
    id: '2',
    nombre: 'Tacos al Pastor Especiales',
    descripcion: 'Tres tacos con carne marinada, piña, cilantro y cebolla.',
    precio: 12.00,
    categoria: 'Entradas',
    imagen: getImage('dish-tacos').url,
    imageHint: getImage('dish-tacos').hint
  },
  {
    id: '3',
    nombre: 'Pasta Carbonara Auténtica',
    descripcion: 'Pancetta, huevo, queso pecorino romano y pimienta negra.',
    precio: 18.00,
    categoria: 'Platos Fuertes',
    imagen: getImage('dish-pasta').url,
    imageHint: getImage('dish-pasta').hint
  },
  {
    id: '4',
    nombre: 'Ensalada César con Pollo Grill',
    descripcion: 'Lechuga romana fresca, crotones, parmesano y aderezo césar.',
    precio: 15.00,
    categoria: 'Entradas',
    imagen: getImage('dish-salad').url,
    imageHint: getImage('dish-salad').hint
  },
  {
    id: '5',
    nombre: 'Mousse de Chocolate Amargo',
    descripcion: 'Chocolate 70% cacao con un toque de sal marina y frutos rojos.',
    precio: 8.50,
    categoria: 'Postres',
    imagen: getImage('dish-dessert').url,
    imageHint: getImage('dish-dessert').hint
  },
  {
    id: '6',
    nombre: 'Limonada de Coco Fresh',
    descripcion: 'Limón recién exprimido mezclado con leche de coco cremosa.',
    precio: 6.00,
    categoria: 'Bebidas',
    imagen: getImage('drink-lemonade').url,
    imageHint: getImage('drink-lemonade').hint
  }
];
