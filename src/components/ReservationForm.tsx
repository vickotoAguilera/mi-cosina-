'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { RESERVAS_OCUPADAS } from '@/constants/mockData';

// Helper para generar los horarios
const generarHorarios = () => {
  const horarios = [];
  for (let h = 13; h <= 22; h++) {
    horarios.push(`${h}:00`);
    if (h < 22) {
      horarios.push(`${h}:30`);
    }
  }
  return horarios;
};

const horariosDisponibles = generarHorarios();

export function ReservationForm() {
  const { features, branding } = useAppContext();
  const { toast } = useToast();
  
  const [fecha, setFecha] = useState<Date | undefined>(new Date());
  const [hora, setHora] = useState<string>('');
  const [personas, setPersonas] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const horariosOcupadosDelDia = useMemo(() => {
    if (!fecha) return [];
    const fechaSeleccionadaStr = fecha.toISOString().split('T')[0];
    return RESERVAS_OCUPADAS
      .filter(reserva => reserva.fecha === fechaSeleccionadaStr)
      .map(reserva => reserva.hora);
  }, [fecha]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha || !hora) {
        toast({ title: 'Error', description: 'Por favor, selecciona una fecha y hora.', variant: 'destructive' });
        return;
    }

    setIsSubmitting(true);
    const nuevaReserva = {
      id: new Date().toISOString(),
      fecha: fecha.toISOString().split('T')[0],
      hora,
      personas,
      cliente: { nombre: 'Cliente Premium' },
      estado: 'pendiente' as const,
    };

    // Simulación de guardado
    setTimeout(() => {
        const reservasPrevias = JSON.parse(localStorage.getItem('reservas') || '[]');
        localStorage.setItem('reservas', JSON.stringify([...reservasPrevias, nuevaReserva]));
        
        setIsSubmitting(false);
        setIsSubmitted(true);

        toast({
            title: '¡Reserva exitosa!',
            description: `Mesa para ${personas} confirmada para el ${fecha.toLocaleDateString()} a las ${hora}.`,
        });
    }, 1000);
  };

  if (!features.enableReservations) {
    return null;
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-12 bg-green-500/10 rounded-2xl border border-green-500/20"
      >
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-serif mb-2">¡Gracias! Hemos recibido tu reserva.</h3>
        <p className="text-muted-foreground">Te esperamos pronto para una experiencia inolvidable.</p>
         <Button onClick={() => setIsSubmitted(false)} className="mt-6">Hacer otra reserva</Button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="bg-background/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h3 className="font-serif text-3xl mb-6 flex items-center gap-3"><CalendarIcon className="w-8 h-8 opacity-50"/> Reserva tu Mesa</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-bold text-lg text-muted-foreground">1. Elige la Fecha</h4>
                <Calendar
                    mode="single"
                    selected={fecha}
                    onSelect={setFecha}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    className="rounded-xl bg-black/20 p-0"
                />
            </div>

            <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-muted-foreground mb-4">2. Selecciona la Hora</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {horariosDisponibles.map(h => {
                        const isOcupado = horariosOcupadosDelDia.includes(h);
                        return (
                            <Button 
                                key={h} 
                                type="button"
                                variant={hora === h ? 'default' : 'outline'}
                                onClick={() => setHora(h)}
                                disabled={isOcupado}
                                className={`transition-all duration-300 ${hora === h ? 'shadow-lg' : ''} ${isOcupado ? 'bg-destructive/20 text-muted-foreground line-through' : ''}`}
                                style={{backgroundColor: hora === h ? branding.primaryColor : undefined}}
                            >
                                {h}
                            </Button>
                        )
                    })}
                  </div>
                </div>
                
                <div className="pt-4">
                   <h4 className="font-bold text-lg text-muted-foreground mb-4">3. Número de Personas</h4>
                   <div className="flex items-center gap-4 bg-black/20 p-3 rounded-xl">
                       <User className="w-6 h-6 text-primary" />
                       <select value={personas} onChange={e => setPersonas(Number(e.target.value))} className="bg-transparent w-full focus:outline-none">
                           {[...Array(8)].map((_, i) => (
                               <option key={i+1} value={i+1} className="bg-background text-foreground">{i+1} Persona{i > 0 && 's'}</option>
                           ))}
                       </select>
                   </div>
                </div>
            </div>

            <div className="md:col-span-2 mt-4">
                <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl" disabled={isSubmitting} style={{backgroundColor: branding.primaryColor}}>
                    {isSubmitting ? 'Confirmando...' : 'Reservar Ahora'}
                </Button>
            </div>
        </form>
    </motion.div>
  );
}
