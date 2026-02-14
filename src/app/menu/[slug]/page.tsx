'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/services/menuService';
import { MenuItem } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/utils/format';
import { ProductCardSkeleton } from '@/components/ProductCard';

const transition = { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] };

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.4, ...transition }
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { features, addToCart, branding } = useAppContext();
  const [product, setProduct] = useState<MenuItem | null>(null);
  const [related, setRelated] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (typeof slug === 'string') {
      getProductBySlug(slug).then(data => {
        if (data) {
          setProduct(data);
          getRelatedProducts(data.id).then(setRelated);
        }
      });
    }
  }, [slug]);

  if (!product) {
    return (
        <div className="p-8">
            <ProductCardSkeleton isLarge={true} />
        </div>
    );
  }

  const imageUrl = product.mainImage?.asset?.url || product.image || '/placeholder-comida.jpg';

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
          {/* Back Button */}
          <motion.div initial={{opacity: 0, x: -100}} animate={{opacity:1, x: 0}} transition={{...transition, delay: 0.5}} className="fixed top-8 left-8 z-50">
            <Button variant="outline" onClick={() => router.back()} className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Main Image with Shared Layout Animation */}
          <div className="relative h-[80vh] w-full overflow-hidden">
            <motion.div
              layoutId={`image-${product.id}`}
              className="absolute inset-0"
              transition={transition}
            >
              <Image
                src={imageUrl}
                alt={product.nombre}
                layout="fill"
                objectFit="cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-20 left-8 md:left-20 max-w-4xl">
                <motion.h1
                    layoutId={`title-${product.id}`}
                    className="text-5xl md:text-8xl font-serif text-white leading-tight"
                    transition={transition}
                >
                    {product.nombre}
                </motion.h1>
            </div>
          </div>
          
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 md:px-20 py-16 -mt-24 relative z-10"
          >
            <div className="bg-background/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="font-serif text-3xl mb-4">Historia del Plato</h2>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {product.descripcion}
                    </p>
                  </div>
                  
                  {product.galleryImages && product.galleryImages.length > 0 && (
                    <div>
                       <h3 className="font-serif text-2xl mb-4">Galería</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {product.galleryImages.map((img, index) => (
                          <div key={index} className="relative aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform duration-500">
                            <Image src={img.asset.url} alt={`Galería ${index + 1}`} layout="fill" objectFit="cover"/>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {features.showPrices && (
                    <div className="bg-secondary/30 p-6 rounded-2xl text-center">
                      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Precio</h3>
                      <span className="font-bold text-4xl tracking-tighter">
                        {formatCurrency(product.precioOferta || product.precio)}
                      </span>
                      {product.precioOferta && (
                         <span className="text-lg text-muted-foreground line-through ml-2">
                          {formatCurrency(product.precio)}
                        </span>
                      )}
                    </div>
                  )}

                  <div>
                    <h3 className="font-serif text-2xl mb-4">Maridaje Sugerido</h3>
                    <div className="space-y-4">
                      {related.map(item => (
                        <Link href={`/menu/${item.id}`} key={item.id} className="block">
                          <div className="flex items-center gap-4 bg-secondary/30 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                             <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                               <Image src={item.mainImage.asset.url} alt={item.nombre} layout="fill" objectFit="cover" />
                             </div>
                             <div>
                               <h4 className="font-semibold">{item.nombre}</h4>
                               <span className="text-sm text-muted-foreground">{item.categoria}</span>
                             </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {features.enableCart && (
            <motion.div 
              className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black to-transparent"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <Button 
                  className="w-full h-16 rounded-full text-lg shadow-2xl shadow-primary/40"
                  style={{ backgroundColor: branding.primaryColor }}
                  onClick={() => addToCart({ id: product.id, nombre: product.nombre, precio: product.precioOferta || product.precio, imagen: imageUrl, cantidad: 1 })}
                >
                  Añadir a la Reserva
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
