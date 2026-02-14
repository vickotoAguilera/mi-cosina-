'use client';

import { useAppContext } from '@/context/AppContext';
import { MenuItem } from '@/constants/mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X, Power, ShoppingCart, DollarSign, Sparkles, Palette, Type, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/format';

export default function AdminPage() {
  const { menu, role, updateProduct, features, updateFeature, branding, updateBranding } = useAppContext();
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
            Controla cada detalle de la experiencia, desde el menú hasta la identidad de marca.
          </p>
        </header>

        <Tabs defaultValue="menu" className="space-y-12">
          <TabsList className="bg-secondary/30 p-1 rounded-full border border-border h-12 inline-flex items-center">
            <TabsTrigger value="menu" className="rounded-full px-8 h-10 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Gestión de Tesoros</TabsTrigger>
            <TabsTrigger value="branding" className="rounded-full px-8 h-10 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Identidad Visual</TabsTrigger>
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
                        style={{ borderRadius: `var(--radius-custom)` }}
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
                      <div 
                        className="bg-secondary/20 p-6 border border-border hover:border-primary/20 transition-all duration-500 overflow-hidden"
                        style={{ borderRadius: `var(--radius-custom)` }}
                      >
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
                            <p className="font-bold">{formatCurrency(plato.precio)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Oferta</p>
                            <p className="font-bold text-primary">{plato.precioOferta ? formatCurrency(plato.precioOferta) : '—'}</p>
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

          <TabsContent value="branding">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    <h3 className="text-2xl font-serif">Colores de Marca</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Color Primario</Label>
                      <div className="flex gap-4">
                        <Input 
                          type="color" 
                          value={branding.primaryColor}
                          onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                          className="w-16 h-12 p-1 rounded-lg cursor-pointer bg-secondary/30"
                        />
                        <Input 
                          value={branding.primaryColor}
                          onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                          className="flex-grow rounded-xl bg-secondary/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Color de Fondo</Label>
                      <div className="flex gap-4">
                        <Input 
                          type="color" 
                          value={branding.backgroundColor}
                          onChange={(e) => updateBranding({ backgroundColor: e.target.value })}
                          className="w-16 h-12 p-1 rounded-lg cursor-pointer bg-secondary/30"
                        />
                        <Input 
                          value={branding.backgroundColor}
                          onChange={(e) => updateBranding({ backgroundColor: e.target.value })}
                          className="flex-grow rounded-xl bg-secondary/30"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Layout className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    <h3 className="text-2xl font-serif">Formas y Bordes</h3>
                  </div>
                  <div className="space-y-6 bg-secondary/20 p-8 rounded-[2.5rem] border border-border">
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-xs font-bold uppercase tracking-widest">Redondeo Global</Label>
                      <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {branding.borderRadius}px
                      </span>
                    </div>
                    <Slider 
                      value={[branding.borderRadius]}
                      min={0}
                      max={60}
                      step={2}
                      onValueChange={(vals) => updateBranding({ borderRadius: vals[0] })}
                    />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold opacity-40">
                      <span>Cuadrado</span>
                      <span>Circular</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Type className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    <h3 className="text-2xl font-serif">Logotipo y Marca</h3>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">URL del Logotipo</Label>
                    <Input 
                      placeholder="https://tu-logo.com/logo.png"
                      value={branding.logoUrl}
                      onChange={(e) => updateBranding({ logoUrl: e.target.value })}
                      className="rounded-xl bg-secondary/30 h-12"
                    />
                    <p className="text-[10px] text-muted-foreground italic">Si se deja vacío, se mostrará el icono por defecto.</p>
                  </div>
                </section>
              </div>

              <div className="bg-secondary/10 rounded-[3rem] border border-dashed border-border p-8 flex flex-col items-center justify-center text-center space-y-8 h-fit sticky top-32">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Vista Previa de Tarjeta</p>
                <div 
                  className="w-full max-w-sm aspect-[4/5] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden group"
                  style={{ borderRadius: `${branding.borderRadius}px` }}
                >
                  <div className="h-2/3 bg-muted relative">
                    <Image src={menu[0].imagenes[0]} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="p-6 space-y-3 text-left">
                    <div 
                      className="w-12 h-1 bg-primary rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    <h4 className="text-xl font-serif">Plato de Ejemplo</h4>
                    <Button 
                      className="w-full"
                      style={{ 
                        backgroundColor: branding.primaryColor,
                        borderRadius: `${branding.borderRadius}px`
                      }}
                    >
                      Botón de Marca
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic max-w-xs">
                  Los cambios se aplican en tiempo real en toda la aplicación.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                className="bg-secondary/20 p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
                style={{ borderRadius: `var(--radius-custom)` }}
              >
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

              <div 
                className="bg-secondary/20 p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
                style={{ borderRadius: `var(--radius-custom)` }}
              >
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

              <div 
                className="bg-secondary/20 p-8 border border-border flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
                style={{ borderRadius: `var(--radius-custom)` }}
              >
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