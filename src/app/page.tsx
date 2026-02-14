import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Featured Section Placeholder for Phase 2 */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Especialidades de la Casa</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Muy pronto podrás explorar nuestro menú completo con los platos más emblemáticos de nuestra cocina.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background/50 rounded-2xl p-8 border border-border/50 animate-pulse">
                <div className="w-full aspect-square bg-muted rounded-xl mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
