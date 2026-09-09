import api from '../../lib/axios';
import type { Product } from '../../types/api';

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/produtos');
  return data;
}

export async function getProduct(productId: string): Promise<Product> {
  const { data } = await api.get<Product>(`/produtos/${productId}`);
  return data;
}
