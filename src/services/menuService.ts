import { MENU_MOCK, MenuItem } from '@/constants/mockData';

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getProducts = async (): Promise<MenuItem[]> => {
  await delay(50);
  return MENU_MOCK;
};

export const getProductBySlug = async (slug: string): Promise<MenuItem | undefined> => {
  await delay(50);
  const product = MENU_MOCK.find(item => item.id === slug);
  return product;
};

export const getRelatedProducts = async (currentProductId: string): Promise<MenuItem[]> => {
  await delay(50);
  return MENU_MOCK.filter(item => item.id !== currentProductId).slice(0, 2);
};
