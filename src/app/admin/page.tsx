'use client';

import { useAppContext } from '@/context/AppContext';
import { MenuItem } from '@/constants/mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X, Camera, Eye, Power, Settings2, ShoppingCart, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { menu, role, updateProduct, features, updateFeature } = useAppContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MenuItem | null>(null);

  if (role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif">Acceso Restringido</h1>
          <p className="text-muted-foreground">Debes tener el rol de Administrador para ver esta sección.</p>
          <Button onClick={() => window.location.href = '/'} variant="outline" className="rounded-full">Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  const handleEdit = (plato: MenuItem) => {
    setEditingId(plato.id);
    setFormData({ ...plato });
  };

  const handleSave = () => {
    if (formData) {
      updateProduct(formData);
      setEditingId(null);
      setFormData(null);
      toast({
        title: "Cambios guardados",
        description: "El menú se ha actualizado con éxito.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold tracking-[0.2em] uppercase border border-primary/10">
              Gestión Maestra
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter">Panel de Control</h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            Controla cada detalle de la experiencia y activa o desactiva módulos globales.
          </p>
        </header>

        <Tabs defaultValue="menu" className="space-y-12">
          <TabsList className="bg-secondary/30 p-1 rounded-full border border-border h-12 inline-flex items-center">
            <TabsTrigger value="menu" className="rounded-full px-8 h-10 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Gestión de Tesoros</TabsTrigger>
            <TabsTrigger value="config" className="rounded-full px-8 h-10 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Ajustes de Plantilla</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {menu.map((plato) => (
                  <motion.div
                    key={plato.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative"
                  >
                    {editingId === plato.id ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-primary/20 shadow-2xl space-y-6 z-10"
                      >
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Nombre del Plato</Label>
                            <Input 
                              value={formData?.nombre} 
                              onChange={(e) => setFormData(f => f ? {...f, nombre: e.target.value} : null)}
                              className="rounded-xl border-border bg-secondary/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Descripción Larga</Label>
                            <Textarea 
                              value={formData?.descripcion} 
                              onChange={(e) => setFormData(f => f ? {...f, descripcion: e.target.value} : null)}
                              className="rounded-xl border-border bg-secondary/20 min-h-[100px]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Precio Base ($)</Label>
                              <Input 
                                type="number"
                                value={formData?.precio} 
                                onChange={(e) => setFormData(f => f ? {...f, precio: parseFloat(e.target.value)} : null)}
                                className="rounded-xl border-border bg-secondary/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Oferta ($)</Label>
                              <Input 
                                type="number"
                                placeholder="Opcional"
                                value={formData?.precioOferta || ''} 
                                onChange={(e) => setFormData(f => f ? {...f, precioOferta: e.target.value ? parseFloat(e.target.value) : undefined} : null)}
                                className="rounded-xl border-border bg-secondary/20"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border">
                            <div className="space-y-0.5">
                              <Label className="text-xs font-bold">Estado del Plato</Label>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Activo en el menú</p>
                            </div>
                            <Switch 
                              checked={formData?.activo} 
                              onCheckedChange={(val) => setFormData(f => f ? {...f, activo: val} : null)}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button onClick={handleSave} className="flex-grow rounded-full bg-accent text-accent-foreground">
                            <Check className="w-4 h-4 mr-2" /> Guardar
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="ghost" className="rounded-full">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-secondary/20 rounded-[2.5rem] p-6 border border-border hover:border-primary/20 transition-all duration-500 overflow-hidden">
                        <div className="flex gap-4 mb-6">
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-border">
                            <Image src={plato.imagenes[0]} alt={plato.nombre} fill className="object-cover" />
                            {!plato.activo && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Power className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow flex flex-col justify-between py-1">
                            <div>
                              <h4 className="font-serif text-xl leading-none">{plato.nombre}</h4>
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 block">
                                {plato.categoria}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${plato.activo ? 'border-green-500/20 text-green-600' : 'border-red-500/20 text-red-500'}`}>
                                {plato.activo ? 'Activo' : 'Inactivo'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50 text-sm">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Precio</p>
                            <p className="font-bold">${plato.precio.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Oferta</p>
                            <p className="font-bold text-primary">{plato.precioOferta ? `$${plato.precioOferta.toFixed(2)}` : '—'}</p>
                          </div>
                        </div>

                        <div className="pt-6 flex gap-3">
                          <Button 
                            onClick={() => handleEdit(plato)} 
                            variant="outline" 
                            className="flex-grow rounded-full border-border hover:bg-accent hover:text-accent-foreground"
                          >
                            <Edit3 className="w-4 h-4 mr-2" /> Editar Tesoro
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card de Carrito */}
              <div className="bg-secondary/20 rounded-[2.5rem] p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit">
                    <ShoppingCart className="w-8 h-8 text-primary" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif">Módulo de Venta</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      Activa o desactiva todo el sistema de carrito de compras en la web.
                    </p>
                  </div>
                </div>
                <div className="pt-8 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Estado del Carrito</span>
                  <Switch 
                    checked={features.enableCart} 
                    onCheckedChange={(val) => updateFeature('enableCart', val)}
                  />
                </div>
              </div>

              {/* Card de Precios */}
              <div className="bg-secondary/20 rounded-[2.5rem] p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit">
                    <DollarSign className="w-8 h-8 text-primary" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif">Visibilidad de Precios</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      Oculta todos los precios del catálogo para un modo "Catálogo Exclusivo".
                    </p>
                  </div>
                </div>
                <div className="pt-8 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Mostrar Precios</span>
                  <Switch 
                    checked={features.showPrices} 
                    onCheckedChange={(val) => updateFeature('showPrices', val)}
                  />
                </div>
              </div>

              {/* Card de Animaciones */}
              <div className="bg-secondary/20 rounded-[2.5rem] p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit">
                    <Sparkles className="w-8 h-8 text-primary" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif">Animaciones Premium</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      Controla los efectos de micro-interacciones y movimiento de imán.
                    </p>
                  </div>
                </div>
                <div className="pt-8 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Animaciones Activas</span>
                  <Switch 
                    checked={features.luxuryAnimations} 
                    onCheckedChange={(val) => updateFeature('luxuryAnimations', val)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
