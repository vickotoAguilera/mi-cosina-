
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-foreground">Mi Cocina Digital</span>
            </Link>
            <p className="text-muted-foreground font-light">
              © {new Date().getFullYear()} Mi Cocina Digital. Todos los derechos reservados.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider">Navegación</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <Link href="/#menu" className="hover:text-primary transition-colors">Menú</Link>
              <Link href="/about" className="hover:text-primary transition-colors">Acerca de</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider">Contacto</h4>
            <p className="text-muted-foreground font-light">
              Dirección: Calle Falsa 123, Springfield
              <br />
              Teléfono: +1 (555) 123-4567
              <br />
              Email: info@micosinadigital.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
