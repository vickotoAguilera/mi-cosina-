'use client';

import { useState } from 'react';
import { MENU_MOCK } from '@/constants/mockData';
import { ProductCard } from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIAS = ['Todos', 'Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'] as const;

export function MenuGrid() {
  const [categoriaActiva, setCategoriaActiva] = useState<typeof CATEGORIAS[number]>('Todos');

  const platosFiltrados = categoriaActiva === 'Todos' 
    ? MENU_MOCK 
    : MENU_MOCK.filter(plato => plato.categoria === categoriaActiva);

  return (
    <section id="menu" className="py-32 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif">Nuestra Selección</h2>
          <p className="text-muted-foreground text-lg max-w-md font-light">
            Cada plato es una obra de arte diseñada para despertar los sentidos.
          </p>
        </div>

        {/* Filtros Estilo Glassmorphism */}
        <div className="flex flex-wrap gap-3 p-2 bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm self-start">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-500 ${
                categoriaActiva === cat 
                  ? 'bg-accent text-accent-foreground shadow-lg' 
                  : 'hover:bg-primary/5 text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[800px]"
      >
        <AnimatePresence mode="popLayout">
          {platosFiltrados.map((plato, idx) => {
            // Lógica de Bento Grid basada en el índice
            let spanClass = "md:col-span-1 md:row-span-1";
            if (idx === 0) spanClass = "md:col-span-2 md:row-span-2";
            if (idx === 2) spanClass = "md:col-span-1 md:row-span-2";

            return (
              <motion.div
                key={plato.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className={spanClass}
              >
                <ProductCard producto={plato} isLarge={idx === 0} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {platosFiltrados.length === 0 && (
        <div className="text-center py-40 bg-muted/20 rounded-[3rem] border border-dashed">
          <p className="text-muted-foreground font-serif text-2xl italic">No se encontraron tesoros en esta categoría.</p>
        </div>
      )}
    </section>
  );
}