'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-restaurant');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10 z-10"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase border border-primary/10">
              Est. 1998 — Tradición Digital
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter">
            Sabor que <br />
            <span className="text-primary italic">trasciende.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed font-light">
            Una experiencia gastronómica curada donde la herencia artesanal se encuentra con la innovación del mañana.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
            <Button size="lg" className="rounded-full h-16 px-10 text-lg font-medium group transition-all hover:scale-105 active:scale-95 bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl">
              Explorar Menú
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button className="text-sm font-bold tracking-widest uppercase border-b-2 border-primary/20 pb-1 hover:border-primary transition-colors">
              Nuestra Herencia
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative aspect-[4/5] lg:aspect-square"
        >
          <motion.div style={{ y: yParallax }} className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-4 border-white/10">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover scale-110"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>
          
          {/* Elementos decorativos flotantes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-[100px]"></div>
        </motion.div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}