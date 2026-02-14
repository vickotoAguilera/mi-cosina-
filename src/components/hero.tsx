import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, ChefHat } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-restaurant');

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
            <ChefHat className="w-4 h-4" />
            <span>Sabor Tradicional & Moderno</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight text-foreground">
            Bienvenidos a <br />
            <span className="text-primary">Mi Cocina Digital</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg font-body leading-relaxed">
            Descubre la esencia de la cocina casera preparada con los ingredientes más frescos 
            y el toque moderno que mereces. Del campo a tu mesa, en un solo clic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="rounded-full text-lg px-8 font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
              Ver el Menú
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 border-primary text-primary hover:bg-primary/5">
              Nuestra Historia
            </Button>
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] rotate-3 blur-2xl"></div>
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-background/50">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 animate-bounce duration-[3000ms]">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              ★
            </div>
            <div>
              <p className="font-bold text-sm">Favorito del Mes</p>
              <p className="text-xs text-muted-foreground italic">Paella de la Abuela</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
}
