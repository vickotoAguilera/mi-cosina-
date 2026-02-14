'use client';

import Image from 'next/image';
import { MenuItem } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  producto: MenuItem;
  isLarge?: boolean;
}

export function ProductCard({ producto, isLarge = false }: ProductCardProps) {
  const { role, addToCart, features } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!features.luxuryAnimations || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.1);
    mouseY.set(y * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const isAdmin = role === 'ADMIN';
  const displayImage = isHovered && producto.imagenes.length > 1 ? producto.imagenes[1] : producto.imagenes[0];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={features.luxuryAnimations ? { x: sx, y: sy } : {}}
      className="h-full"
    >
      <Card className={`relative h-full overflow-hidden group border-none bg-secondary/30 backdrop-blur-md rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${!producto.activo ? 'grayscale opacity-60' : ''}`}>
        <div className={`relative w-full ${isLarge ? 'h-full' : 'aspect-[4/5]'} overflow-hidden`}>
          <Image
            src={displayImage}
            alt={producto.nombre}
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-110"
            data-ai-hint={producto.imageHint}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          
          {/* Badge de No Disponible */}
          {!producto.activo && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="font-serif text-white text-lg italic tracking-widest bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                Agotado temporalmente
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">
                  {producto.categoria}
                </span>
                <h3 className={`font-serif text-white leading-tight ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                  {producto.nombre}
                </h3>
              </div>
              
              {features.showPrices && (
                <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 flex flex-col items-end">
                  {producto.precioOferta && (
                    <span className="text-[10px] text-white/50 line-through">
                      ${producto.precio.toFixed(2)}
                    </span>
                  )}
                  <span className="text-white font-bold tracking-tighter">
                    ${(producto.precioOferta || producto.precio).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {isLarge && (
              <p className="text-white/70 text-sm font-light leading-relaxed max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
                {producto.descripcion}
              </p>
            )}

            <div className="pt-2 flex gap-4 items-center">
              {isAdmin ? (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <Link href={`/admin`}>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-white/10 border-white/20 hover:bg-white text-white hover:text-black transition-colors"
                    >
                      <Edit3 className="w-4 h-4" strokeWidth={1} />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/10 border-white/20 hover:bg-destructive text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1} />
                  </Button>
                </div>
              ) : features.enableCart && (
                <motion.div 
                  className="w-full"
                  whileHover={producto.activo ? { scale: 1.02 } : {}}
                  whileTap={producto.activo ? { scale: 0.98 } : {}}
                >
                  <Button 
                    disabled={!producto.activo}
                    className="w-full h-12 rounded-full bg-primary text-white hover:bg-primary/90 transition-all group-hover:shadow-xl group-hover:shadow-primary/20 disabled:bg-white/10 disabled:text-white/40"
                    onClick={() => addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precioOferta || producto.precio, imagen: producto.imagenes[0], cantidad: 1 })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Reservar Plato
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
