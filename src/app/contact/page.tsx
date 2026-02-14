
import ContactForm from '@/components/contact/contact-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con nosotros.',
};

const ContactPage = () => {
  return (
    <div className="container mx-auto py-12">
      <ContactForm />
    </div>
  );
};

export default ContactPage;
