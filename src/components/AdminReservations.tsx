'use client';

import { useState, useEffect } from 'react';
import { Reserva } from '@/constants/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, Clock, Users } from 'lucide-react';

export function AdminReservations() {
    const [reservas, setReservas] = useState<Reserva[]>([]);

    useEffect(() => {
        const storedReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        setReservas(storedReservas);
    }, []);

    const updateReservationStatus = (id: string, estado: Reserva['estado']) => {
        const updatedReservas = reservas.map(r => r.id === id ? { ...r, estado } : r);
        setReservas(updatedReservas);
        localStorage.setItem('reservas', JSON.stringify(updatedReservas));
    };

    const sortedReservas = [...reservas].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-serif">Próximas Reservas</h2>
            <AnimatePresence>
                {sortedReservas.length > 0 ? (
                    sortedReservas.map(reserva => (
                        <motion.div
                            key={reserva.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                            className="bg-background/60 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg"
                        >
                            <div className="flex-grow space-y-3">
                                <div className="flex items-center gap-4 text-lg">
                                    <span className="font-bold text-primary">{reserva.cliente.nombre}</span>
                                    <Badge 
                                        variant={reserva.estado === 'confirmada' ? 'default' : reserva.estado === 'cancelada' ? 'destructive' : 'outline'}
                                        className="capitalize"
                                    >
                                        {reserva.estado}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2"><Calendar size={16}/> {new Date(reserva.fecha).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-2"><Clock size={16}/> {reserva.hora}</div>
                                    <div className="flex items-center gap-2"><Users size={16}/> {reserva.personas} personas</div>
                                </div>
                            </div>
                            <div className="flex gap-3 self-end md:self-center">
                                <Button 
                                    size="icon" 
                                    variant="outline"
                                    onClick={() => updateReservationStatus(reserva.id, 'confirmada')}
                                    className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30"
                                    disabled={reserva.estado === 'confirmada'}
                                >
                                    <Check size={18} />
                                </Button>
                                <Button 
                                    size="icon" 
                                    variant="outline"
                                    onClick={() => updateReservationStatus(reserva.id, 'cancelada')}
                                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                                    disabled={reserva.estado === 'cancelada'}
                                >
                                    <X size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 border border-dashed rounded-2xl">
                        <p className="text-muted-foreground font-serif text-xl italic">Aún no hay reservas pendientes.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}