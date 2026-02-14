# Plan Estratégico: Plantilla Premium 2026 para Restaurantes

## Visión del Proyecto

Plantilla Premium 2026 para restaurantes de lujo, con un enfoque modular, inmersivo y totalmente responsivo.

## Stack Tecnológico

- **Framework**: Next.js 15.1.2 (App Router)
- **UI**: React 19 y Tailwind CSS v4.0.0
- **Animaciones**: Framer Motion v11.15.0
- **Iconos**: Lucide React
- **Hosting**: Cloudflare (Planificado)

## Estrategia de Datos

- **Fase Actual**: MockData local con persistencia en LocalStorage. Los datos se simulan para una experiencia de desarrollo ágil.
- **Fase Futura**: Integración total con Sanity.io como CMS para una gestión centralizada de imágenes, precios y disponibilidad de platos.
- **Servicio**: `menuService.ts` actúa como un puente, permitiendo una transición fluida desde los datos locales a la integración con Sanity.io sin necesidad de refactorizar componentes.

## Sistema de Modularidad (Feature Flags)

La plantilla cuenta con un sistema de "feature flags" que permite activar o desactivar funcionalidades clave directamente desde el panel de Administrador, sin necesidad de modificar el código. Las características gestionables incluyen:

- **Carrito de Compras**
- **Visualización de Precios**
- **Sistema de Reservas**

## Identidad y Localización

- **Moneda**: Configurada para Pesos Chilenos (CLP), con formato de miles y sin decimales.
- **Marca Blanca**: Un sistema de temas dinámicos permite a los dueños de restaurantes personalizar la apariencia de la plantilla. Se pueden modificar colores, logos y el redondeo de las esquinas (estilo Bento Grid) desde el Dashboard de Administrador.

## Hoja de Ruta (Roadmap)

- **Implementación de Google Auth**: Transición del mock de autenticación a una implementación real con Google Auth.
- **Conexión de Schemas de Sanity**: Integración completa con Sanity.io para la gestión de contenido.
- **Sistema de Reservas por Calendario**: Desarrollo de un módulo de reservas con selección de fecha y hora.
- **Proyecto Independiente Futuro**: Creación de un sistema de pedidos por mesa a través de códigos QR, como una extensión del proyecto principal.
