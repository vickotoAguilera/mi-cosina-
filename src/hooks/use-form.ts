
import { useState } from 'react';

export const useForm = (formId: string) => {
  const [state, setState] = useState({ submitting: false, succeeded: false, errors: {} });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, submitting: true }));

    // Simulamos una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setState({ submitting: false, succeeded: true, errors: {} });
    
    return { body: { ok: true } };
  };

  return [state, handleSubmit] as const;
};

export const ValidationError = ({ prefix, field, errors }: { prefix: string, field: string, errors: any }) => {
  if (!errors || !errors[field]) {
    return null;
  }

  return (
    <div className="text-red-500 text-sm mt-1">
      {prefix} {errors[field]}
    </div>
  );
};
