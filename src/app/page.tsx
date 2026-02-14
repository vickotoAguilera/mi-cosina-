
import { Hero } from '@/components/hero';
import { MenuGrid } from '@/components/MenuGrid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Sección del Menú */}
      <section id="menu" className="bg-background">
        <MenuGrid />
      </section>

      {/* Sección Informativa / Historia */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Del campo a tu mesa, <span className="text-primary italic">con orgullo</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                Nuestra cocina no solo se trata de comida, se trata de recuerdos. 
                Utilizamos técnicas tradicionales heredadas por generaciones, combinadas 
                con una gestión digital moderna para que nunca pierdas el hilo de tus sabores favoritos.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl lg:text-4xl font-bold text-primary">100%</p>
                  <p className="text-[10px] lg:text-sm font-medium text-muted-foreground uppercase tracking-wider">Ingredientes Frescos</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl lg:text-4xl font-bold text-primary">25+</p>
                  <p className="text-[10px] lg:text-sm font-medium text-muted-foreground uppercase tracking-wider">Años de Tradición</p>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-[2rem] lg:rounded-[3rem] aspect-video relative overflow-hidden shadow-2xl border border-border">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000')] bg-cover bg-center opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
