
'use client';

import { useState } from 'react';
import { MENU_MOCK } from '@/constants/mockData';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIAS = ['Todos', 'Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'] as const;

export function MenuGrid() {
  const [categoriaActiva, setCategoriaActiva] = useState<typeof CATEGORIAS[number]>('Todos');

  const platosFiltrados = categoriaActiva === 'Todos' 
    ? MENU_MOCK 
    : MENU_MOCK.filter(plato => plato.categoria === categoriaActiva);

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex flex-col items-center space-y-8 mb-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Nuestro Menú</h2>
          <p className="text-muted-foreground max-w-xl">
            Una selección cuidadosamente curada de lo mejor de nuestra cocina.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-secondary/30 rounded-full border border-border/50">
          {CATEGORIAS.map((cat) => (
            <Button
              key={cat}
              variant={categoriaActiva === cat ? "default" : "ghost"}
              onClick={() => setCategoriaActiva(cat)}
              className={`rounded-full px-6 transition-all ${
                categoriaActiva === cat ? 'shadow-md' : 'hover:bg-background/50'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Productos con Animación */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {platosFiltrados.map((plato) => (
            <motion.div
              key={plato.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard producto={plato} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {platosFiltrados.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
          <p className="text-muted-foreground font-medium">No hay platos disponibles en esta categoría.</p>
        </div>
      )}
    </section>
  );
}
