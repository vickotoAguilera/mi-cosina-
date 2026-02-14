'use client';

import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, updateQuantity, clearCart, removeFromCart } = useAppContext();
  const { toast } = useToast();

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleCheckout = () => {
    toast({
      title: "Reserva confirmada",
      description: "Tu pedido está siendo procesado por nuestros chefs.",
    });
    clearCart();
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-[101] flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="p-8 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif">Tu Selección</h2>
                <p className="text-muted-foreground text-sm font-light mt-1">Sabores listos para trascender</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(false)}
                className="rounded-full hover:bg-secondary"
              >
                <X className="w-6 h-6 stroke-1" />
              </Button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag className="w-16 h-16 stroke-1" />
                  <p className="font-serif text-xl italic">El carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-border">
                          <Image
                            src={item.imagen}
                            alt={item.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg leading-tight">{item.nombre}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4 stroke-1" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-primary">${(item.precio * item.cantidad).toFixed(2)}</p>
                          
                          {/* Controles de Cantidad */}
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex items-center bg-secondary/50 rounded-full border border-border p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold">{item.cantidad}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-secondary/20 border-t border-border space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-serif">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-16 rounded-full text-lg font-medium bg-accent text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent/20"
                    onClick={handleCheckout}
                  >
                    Continuar al Pago
                  </Button>
                  <button 
                    onClick={clearCart}
                    className="w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-bold"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
