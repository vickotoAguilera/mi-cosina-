'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, subtotal, iva, total, clearCart, branding, features } = useAppContext();
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [nota, setNota] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !contacto) return;

    setStatus('processing');
    await new Promise(res => setTimeout(res, 2000));
    
    // Esto es una simulacion. En un caso real, aqui se haria la llamada a la API
    const success = Math.random() > 0.1; // 90% de exito

    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const handleCloseSuccess = () => {
    clearCart();
    setStatus('idle');
    router.push('/');
  };

  if (!features.enableCart) {
    router.push('/');
    return null;
  }

  if (cart.length === 0 && status !== 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-serif text-muted-foreground">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mt-2">Agrega algunos productos para poder finalizar tu pedido.</p>
        <Button onClick={() => router.push('/')} className="mt-6">Volver al Menú</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl py-24 px-4">
      <AnimatePresence mode="wait">
        {status !== 'idle' ? (
          <motion.div 
            key={status}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            {status === 'processing' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-16 h-16" style={{ color: branding.primaryColor }} />
                </motion.div>
                <h2 className="text-2xl font-serif">Procesando tu pedido...</h2>
              </div>
            )}
            {status === 'success' && (
              <div className="text-center flex flex-col items-center gap-4 bg-secondary p-8 rounded-3xl shadow-2xl">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <h2 className="text-3xl font-serif">¡Pedido procesado con éxito!</h2>
                <p className="text-muted-foreground max-w-sm">Gracias por tu compra. Recibirás una notificación en breve con los detalles.</p>
                <Button onClick={handleCloseSuccess} size="lg" className="mt-4">Cerrar</Button>
              </div>
            )}
            {status === 'error' && (
              <div className="text-center flex flex-col items-center gap-4 bg-secondary p-8 rounded-3xl shadow-2xl">
                <XCircle className="w-20 h-20 text-red-500" />
                <h2 className="text-3xl font-serif">Hubo un error</h2>
                <p className="text-muted-foreground max-w-sm">No pudimos procesar tu pedido. Por favor, inténtalo de nuevo.</p>
                <Button onClick={() => setStatus('idle')} size="lg" className="mt-4">Reintentar</Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-serif text-center mb-16">Finalizar Pedido</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Columna de Formulario */}
              <div className="bg-secondary/30 p-8 rounded-3xl" style={{ borderRadius: `var(--radius-custom)` }}>
                <h2 className="text-3xl font-serif mb-8">Tus Datos</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-muted-foreground mb-2">Nombre Completo</label>
                    <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="h-12" />
                  </div>
                  <div>
                    <label htmlFor="contacto" className="block text-sm font-medium text-muted-foreground mb-2">Número de Contacto (WhatsApp)</label>
                    <Input id="contacto" type="tel" value={contacto} onChange={(e) => setContacto(e.target.value)} required className="h-12" />
                  </div>
                  <div>
                    <label htmlFor="nota" className="block text-sm font-medium text-muted-foreground mb-2">Nota especial (opcional)</label>
                    <Textarea id="nota" value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Ej: alergia a los frutos secos, es para un regalo..." />
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg" style={{ backgroundColor: branding.primaryColor }} disabled={!nombre || !contacto}>
                    Confirmar y Pagar
                  </Button>
                </form>
              </div>

              {/* Columna de Resumen */}
              <div className="space-y-8">
                <div className="bg-secondary/30 p-8 rounded-3xl" style={{ borderRadius: `var(--radius-custom)` }}>
                  <h2 className="text-3xl font-serif mb-8">Resumen del Pedido</h2>
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Image src={item.imagen} alt={item.nombre} width={64} height={64} className="rounded-lg" />
                        <div className="flex-grow">
                          <p className="font-semibold">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.precio * item.cantidad)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/30 p-8 rounded-3xl" style={{ borderRadius: `var(--radius-custom)` }}>
                  <h3 className="text-2xl font-serif mb-6">Totales</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>IVA (19%)</span>
                      <span>{formatCurrency(iva)}</span>
                    </div>
                    <div className="border-t border-border my-3"></div>
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span style={{ color: branding.primaryColor }}>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
