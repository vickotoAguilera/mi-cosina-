
# Plantilla Mi Cocina Digital v1.0

¡Bienvenido a **Mi Cocina Digital**! Esta es una plantilla de Next.js profesional, modular y optimizada para SEO, diseñada para restaurantes y negocios gastronómicos que deseen una presencia online de alto impacto.

La plantilla ha sido construida pensando en la escalabilidad, la personalización y un rendimiento excepcional, utilizando las tecnologías web más modernas.

## Stack Tecnológico

Este proyecto aprovecha un stack de desarrollo de vanguardia para garantizar una experiencia de usuario fluida y una gestión de contenido eficiente:

- **Framework Principal:** [Next.js 15](https://nextjs.org/) (React Server Components, App Router)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) (con su motor de compilación Lightning CSS)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Gestión de Estado:** React Context API
- **Calidad de Código:** TypeScript, ESLint, Prettier

## Características Principales

- **100% Personalizable:** Gracias a un sistema de configuración centralizado, puedes cambiar colores, tipografías y hasta el redondeo de los bordes para que coincida con tu identidad de marca.
- **Gestión de Contenido Flexible:** Inicialmente configurado con datos de demostración, el proyecto está preparado para conectarse a un CMS headless como Sanity.
- **Optimizado para SEO:** Estructura semántica, metadatos dinámicos y sitemap generado automáticamente.
- **Panel de Administración Integrado:** Un dashboard protegido permite gestionar el menú y las características de la plantilla en tiempo real sin tocar el código.

## Activación y Desactivación de Funciones (Feature Flags)

Puedes controlar características clave de la aplicación directamente desde el panel de administración, sin necesidad de realizar un nuevo despliegue.

Para acceder al panel, navega a `/admin`. Desde allí, podrás modificar:

- **Módulo de Venta (`enableCart`):** Activa o desactiva el carrito de compras y todo el flujo de pedidos.
- **Visibilidad de Precios (`showPrices`):** Convierte tu menú en un catálogo exclusivo ocultando todos los precios.
- **Animaciones Premium (`luxuryAnimations`):** Controla las micro-interacciones y efectos visuales avanzados para un toque extra de elegancia.

Estos ajustes se guardan localmente en el navegador y persistirán para futuras visitas.

## Próximos Pasos y Escalabilidad

Esta plantilla es una base sólida. Los siguientes pasos recomendados para llevarla a producción son:

1.  **Conexión con Sanity:**
    - Crea un proyecto en [Sanity.io](https://www.sanity.io/).
    - Define tus esquemas de contenido (ej. `productos`, `categorias`).
    - Reemplaza las llamadas del `menuService.ts` para que consuman datos desde el cliente de Sanity en lugar de los datos de demostración.

2.  **Autenticación con Google (o cualquier otro proveedor):**
    - Configura un proveedor de autenticación (como NextAuth.js o Firebase Authentication).
    - Protege el panel de administración (`/admin`) para que solo los usuarios con el rol 'ADMIN' puedan acceder.
    - Implementa la lógica para que el `AppContext` refleje el estado de autenticación del usuario.

## Instalación y Despliegue

Para levantar el proyecto en un entorno de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

_Esta plantilla fue desarrollada por Vickoto Aguilera._
