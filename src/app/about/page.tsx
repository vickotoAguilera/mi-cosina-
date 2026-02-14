
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Acerca de Nosotros',
  description: 'Conoce más sobre nuestra empresa.',
};

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Acerca de Nosotros</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Bienvenido a nuestra página "Acerca de". Aquí puedes compartir información sobre tu empresa, tu misión, tu equipo y lo que te hace especial.
          </p>
          <p>
            Esta es una plantilla básica que puedes modificar y ampliar según tus necesidades. No dudes en agregar más secciones, imágenes y cualquier otro contenido que consideres relevante.
          </p>
          <h2>Nuestra Misión</h2>
          <p>
            Nuestra misión es proporcionar soluciones de alta calidad que superen las expectativas de nuestros clientes. Nos esforzamos por la excelencia en todo lo que hacemos, desde el desarrollo de software hasta la atención al cliente.
          </p>
          <h2>Nuestro Equipo</h2>
          <p>
            Contamos con un equipo de profesionales apasionados y experimentados que se dedican a crear productos y servicios innovadores. Cada miembro de nuestro equipo aporta una perspectiva única y un conjunto de habilidades que nos permite abordar los desafíos más complejos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
