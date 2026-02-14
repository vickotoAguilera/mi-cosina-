'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authProvider';
import { motion } from 'framer-motion';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'ADMIN') {
      router.push('/');
    }
  }, [role, router]);

  if (role !== 'ADMIN') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 flex items-center justify-center"
      >
        <p className="text-2xl font-serif">Redirigiendo...</p>
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
