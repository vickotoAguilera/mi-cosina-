/**
 * @fileOverview Datos de ejemplo extendidos para Mi Cocina Digital con soporte premium y precios en CLP.
 */

import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOferta?: number;
  categoria: 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas';
  imagenes: string[];
  activo: boolean;
  imageHint: string;
}

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(i => i.id === id);
  return img?.imageUrl || 'https://picsum.photos/seed/food/600/400';
};

export const MENU_MOCK: MenuItem[] = [
  {
    id: '1',
    nombre: 'Paella de la Abuela',
    descripcion: 'Arroz bomba con mariscos frescos, azafrán y el secreto de la casa. Un viaje directo al mediterráneo en cada bocado.',
    precio: 24900,
    precioOferta: 21500,
    categoria: 'Platos Fuertes',
    imagenes: [getImage('dish-paella'), 'https://picsum.photos/seed/paella2/600/400', 'https://picsum.photos/seed/paella3/600/400'],
    activo: true,
    imageHint: 'paella seafood'
  },
  {
    id: '2',
    nombre: 'Tacos al Pastor Especiales',
    descripcion: 'Tres tacos con carne marinada en achiote, piña asada, cilantro y cebolla sobre tortilla artesanal.',
    precio: 12500,
    categoria: 'Entradas',
    imagenes: [getImage('dish-tacos'), 'https://picsum.photos/seed/tacos2/600/400'],
    activo: true,
    imageHint: 'mexican tacos'
  },
  {
    id: '3',
    nombre: 'Pasta Carbonara Auténtica',
    descripcion: 'Pancetta crujiente, yema de huevo, queso pecorino romano DOP y pimienta negra molida al momento.',
    precio: 18900,
    categoria: 'Platos Fuertes',
    imagenes: [getImage('dish-pasta'), 'https://picsum.photos/seed/pasta2/600/400'],
    activo: false,
    imageHint: 'italian pasta'
  },
  {
    id: '4',
    nombre: 'Ensalada César con Pollo Grill',
    descripcion: 'Lechuga romana orgánica, crotones de pan de masa madre, parmesano y aderezo césar clásico.',
    precio: 14500,
    categoria: 'Entradas',
    imagenes: [getImage('dish-salad'), 'https://picsum.photos/seed/salad2/600/400'],
    activo: true,
    imageHint: 'caesar salad'
  },
  {
    id: '5',
    nombre: 'Mousse de Chocolate Amargo',
    descripcion: 'Chocolate 70% cacao con un toque de sal de Maldon, aceite de oliva virgen y frutos rojos de temporada.',
    precio: 8900,
    categoria: 'Postres',
    imagenes: [getImage('dish-dessert'), 'https://picsum.photos/seed/dessert2/600/400'],
    activo: true,
    imageHint: 'chocolate mousse'
  },
  {
    id: '6',
    nombre: 'Limonada de Coco Fresh',
    descripcion: 'Limón recién exprimido mezclado con leche de coco cremosa y hielo frappé.',
    precio: 5500,
    categoria: 'Bebidas',
    imagenes: [getImage('drink-lemonade'), 'https://picsum.photos/seed/drink2/600/400'],
    activo: true,
    imageHint: 'coconut drink'
  }
];
