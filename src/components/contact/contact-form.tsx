
"use client";

import { useState } from 'react';
import { useForm, ValidationError } from '@/hooks/use-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("contactForm");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await handleSubmit(event);
    // @ts-ignore
    if (result.body.ok) {
      setShowSuccessMessage(true);
    }
  };

  if (showSuccessMessage) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>¡Gracias por tu mensaje!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Hemos recibido tu consulta y te responderemos a la brevedad.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Contáctanos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 block w-full"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              className="mt-1 block w-full"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <Button type="submit" disabled={state.submitting} className="w-full">
            {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
