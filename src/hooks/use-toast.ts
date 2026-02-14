
import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState<any>(null);

  const showToast = (options: any) => {
    setToast(options);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return { toast, toast: showToast };
};
