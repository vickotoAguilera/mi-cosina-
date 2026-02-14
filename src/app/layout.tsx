
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://micosinadigital.com"), // Reemplaza con tu dominio
  title: {
    default: "Mi Cocina Digital | Menú y Pedidos",
    template: `%s | Mi Cocina Digital`,
  },
  description: "Explora nuestro menú y ordena deliciosos platillos a domicilio.",
  openGraph: {
    title: "Mi Cocina Digital | Menú y Pedidos",
    description: "Explora nuestro menú y ordena deliciosos platillos a domicilio.",
    url: "https://micosinadigital.com", // Reemplaza con tu dominio
    siteName: "Mi Cocina Digital",
    images: [
      {
        url: "/og-image.png", // Asegúrate de tener esta imagen en tu carpeta public
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Cocina Digital | Menú y Pedidos",
    description: "Explora nuestro menú y ordena deliciosos platillos a domicilio.",
    images: ["/og-image.png"], // Asegúrate de tener esta imagen en tu carpeta public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
