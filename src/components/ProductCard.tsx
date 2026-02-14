'use client';

import Image from 'next/image';
import { MenuItem } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit3, Trash2, Timer } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  producto: MenuItem;
  isLarge?: boolean;
}

export function ProductCard({ producto, isLarge = false }: ProductCardProps) {
  const { role, addToCart, features, branding } = useAppContext();
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
  
  const imageUrl = producto.mainImage?.asset?.url || producto.image || '/placeholder-comida.jpg';
  const displayImage = isHovered && producto.galleryImages && producto.galleryImages.length > 0
    ? producto.galleryImages[0]?.asset?.url || imageUrl
    : imageUrl;

  const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precioOferta || producto.precio, imagen: imageUrl, cantidad: 1 });
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={features.luxuryAnimations ? { x: sx, y: sy } : {}}
      className="h-full"
    >
      <Link href={`/menu/${producto.id}`} passHref legacyBehavior>
        <Card 
          className={`relative h-full overflow-hidden group border-none bg-secondary/30 dark:bg-card/60 backdrop-blur-md transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] ${!producto.activo ? 'grayscale opacity-60 brightness-75' : ''}`}
          style={{ borderRadius: `var(--radius-custom)` }}
        >
          <motion.div 
            layoutId={`image-${producto.id}`}
            className={`relative w-full ${isLarge ? 'h-full' : 'aspect-[4/5]'} overflow-hidden`}
          >
            <Image
              src={displayImage}
              alt={producto.nombre}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          </motion.div>
          
          {!producto.activo && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 bg-background/40 dark:bg-background/60 backdrop-blur-md text-foreground/80 dark:text-foreground/80 text-xs font-semibold tracking-wider uppercase rounded-full px-4 py-2">
                <Timer className="w-4 h-4" />
                <span>Agotado</span>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                 <motion.span 
                  className="text-[10px] uppercase tracking-[0.3em] text-white/60 dark:text-foreground/50 font-bold"
                 >
                  {producto.categoria}
                </motion.span>
                <motion.h3 
                  layoutId={`title-${producto.id}`}
                  className={`font-serif text-white dark:text-foreground leading-tight ${isLarge ? 'text-4xl' : 'text-2xl'}`}
                >
                  {producto.nombre}
                </motion.h3>
              </div>
              
              {features.showPrices && (
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl px-4 py-2 rounded-2xl border-white/20 dark:border-white/10 flex flex-col items-end">
                  {producto.precioOferta && (
                    <span className="text-[10px] text-white/50 dark:text-foreground/50 line-through">
                      {formatCurrency(producto.precio)}
                    </span>
                  )}
                  <span className="text-white dark:text-foreground font-bold tracking-tighter">
                    {formatCurrency(producto.precioOferta || producto.precio)}
                  </span>
                </div>
              )}
            </div>

            {isLarge && (
              <p className="text-white/70 dark:text-foreground/70 text-sm font-light leading-relaxed max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
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
                      className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 hover:bg-white text-white hover:text-black dark:text-foreground dark:hover:text-background transition-colors"
                    >
                      <Edit3 className="w-4 h-4" strokeWidth={1} />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 hover:bg-destructive text-white transition-colors dark:text-foreground"
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
                    className="w-full h-12 rounded-full text-white dark:text-primary-foreground transition-all group-hover:shadow-xl group-hover:shadow-primary/20 disabled:bg-white/10 disabled:text-white/40 dark:disabled:bg-white/5 dark:disabled:text-white/20"
                    style={{ backgroundColor: branding.primaryColor }}
                    onClick={handleAddToCart}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Reservar Plato
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton({ isLarge = false }) {
  return (
    <Card className="h-full overflow-hidden border-none bg-secondary/30 dark:bg-card/60 animate-pulse">
      <div className={`relative w-full ${isLarge ? 'h-full' : 'aspect-[4/5]'}`}>
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-8 w-3/4" />
          </div>
          <div className="pt-10">
             <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}
