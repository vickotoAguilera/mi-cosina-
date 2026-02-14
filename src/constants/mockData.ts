export type Categoria = 'Entradas' | 'Platos Fuertes' | 'Postres' | 'Bebidas';

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOferta?: number;
  categoria: Categoria;
  activo: boolean;
  image?: string; // Legacy field
  mainImage: { // Sanity-like structure
    asset: {
      url: string;
    };
  };
  galleryImages?: {
    asset: {
      url: string;
    };
  }[];
}

export const MENU_MOCK: MenuItem[] = [
  {
    id: '1',
    nombre: 'Ceviche de la Casa',
    descripcion: 'Nuestro famoso ceviche preparado con corvina fresca, marinada en jugo de limón, ají limo, cebolla roja y cilantro. Servido con camote glaseado y maíz cancha.',
    precio: 35.00,
    categoria: 'Entradas',
    activo: true,
    mainImage: { asset: { url: '/platos/ceviche-de-la-casa.jpg' } },
  },
  {
    id: '2',
    nombre: 'Lomo Saltado',
    descripcion: 'Trozos de lomo fino flambeados al wok con cebolla, tomate y ají amarillo. Acompañado de papas fritas y arroz con choclo.',
    precio: 55.00,
    precioOferta: 49.50,
    categoria: 'Platos Fuertes',
    activo: true,
    mainImage: { asset: { url: '/platos/lomo-saltado.jpg' } },
  },
  {
    id: '3',
    nombre: 'Suspiro a la Limeña',
    descripcion: 'Dulce de manjar blanco cubierto con merengue al oporto. Un postre clásico que te transportará a la Lima de antaño.',
    precio: 25.00,
    categoria: 'Postres',
    activo: true,
    mainImage: { asset: { url: '/platos/suspiro-limena.jpg' } },
  },
  {
    id: '4',
    nombre: 'Pisco Sour',
    descripcion: 'El cóctel bandera de Perú. Preparado con pisco quebranta, jugo de limón recién exprimido, jarabe de goma y clara de huevo.',
    precio: 28.00,
    categoria: 'Bebidas',
    activo: true,
    mainImage: { asset: { url: '/platos/pisco-sour.jpg' } },
  },
  {
    id: '5',
    nombre: 'Causa Limeña',
    descripcion: 'Suave puré de papa amarilla sazonado con ají amarillo y limón, relleno de pollo deshilachado y mayonesa casera.',
    precio: 30.00,
    categoria: 'Entradas',
    activo: true,
    mainImage: { asset: { url: '/platos/causa-limena.jpg' } },
  },
  {
    id: '6',
    nombre: 'Ají de Gallina',
    descripcion: 'Pechuga de gallina deshilachada en una cremosa salsa de ají amarillo, pan y leche. Servido con papas, huevo y aceitunas.',
    precio: 45.00,
    categoria: 'Platos Fuertes',
    activo: false,
    mainImage: { asset: { url: '/platos/aji-de-gallina.jpg' } },
  },
  {
    id: '7',
    nombre: 'Arroz con Pato',
    descripcion: 'Jugoso pato cocido lentamente en cerveza negra y culantro, servido sobre un delicioso arroz verde con arvejas y pimientos.',
    precio: 65.00,
    categoria: 'Platos Fuertes',
    activo: true,
    mainImage: { asset: { url: '/platos/arroz-con-pato.jpg' } },
  },
];

export interface Reserva {
    id: string;
    fecha: string; // YYYY-MM-DD
    hora: string; // HH:mm
    personas: number;
    cliente: {
        nombre: string;
        email?: string;
    };
    estado: 'confirmada' | 'pendiente' | 'cancelada';
}

// Fecha en formato YYYY-MM-DD para compatibilidad con el calendario
export const RESERVAS_OCUPADAS: Pick<Reserva, 'fecha' | 'hora'>[] = [
    { fecha: new Date().toISOString().split('T')[0], hora: '20:00' },
    { fecha: new Date().toISOString().split('T')[0], hora: '20:30' },
];
