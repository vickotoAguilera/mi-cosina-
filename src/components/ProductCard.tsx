
'use client';

import Image from 'next/image';
import { MenuItem } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ProductCardProps {
  producto: MenuItem;
}

export function ProductCard({ producto }: ProductCardProps) {
  const { role, addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen
    });
  };

  const isAdmin = role === 'ADMIN';

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/40 bg-card">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={producto.imageHint}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-border">
            ${producto.precio.toFixed(2)}
          </span>
        </div>
      </div>
      
      <CardHeader className="p-4 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-headline font-bold leading-tight group-hover:text-primary transition-colors">
            {producto.nombre}
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {producto.descripcion}
        </p>
      </CardHeader>

      <CardFooter className="p-4 pt-0">
        {isAdmin ? (
          <div className="flex w-full gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-2"
              onClick={() => console.log('Editar:', producto.nombre)}
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="px-3"
              onClick={() => console.log('Eliminar:', producto.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full rounded-full gap-2 shadow-md hover:shadow-primary/20"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4" />
            Añadir al Carrito
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
