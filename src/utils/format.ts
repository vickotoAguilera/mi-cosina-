/**
 * @fileOverview Utilidades de formateo para la aplicación.
 */

/**
 * Formatea un número como moneda chilena (CLP).
 * Ejemplo: 15000 -> $15.000
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
