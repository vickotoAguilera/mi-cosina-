/**
 * @fileOverview Configuración inicial de las funciones de la plantilla.
 */

export interface AppFeatures {
  enableCart: boolean;
  showPrices: boolean;
  luxuryAnimations: boolean;
  enableAdminManagement: boolean;
}

export const INITIAL_FEATURES: AppFeatures = {
  enableCart: true,
  showPrices: true,
  luxuryAnimations: true,
  enableAdminManagement: true,
};
