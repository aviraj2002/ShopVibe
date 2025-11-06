import type { Product } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const productData: Omit<Product, 'image' | 'imageHint'>[] = [
  { id: 'prod_001', name: 'Aura Headphones', price: 299.99 },
  { id: 'prod_002', name: 'Chrono Watch', price: 449.50 },
  { id: 'prod_003', name: 'Hydro Flask', price: 45.00 },
  { id: 'prod_004', name: 'Leather Tome', price: 75.00 },
  { id: 'prod_005', name: 'Serenity Candles', price: 32.99 },
  { id: 'prod_006', name: 'TypeMaster Keyboard', price: 189.99 },
  { id: 'prod_007', name: 'SonicBoom Speaker', price: 120.00 },
  { id: 'prod_008', name: 'Lumina Lamp', price: 89.95 },
];

export const products: Product[] = productData.map((p) => {
  const imageData = PlaceHolderImages.find((img) => img.id === p.id);
  if (!imageData) {
    throw new Error(`Image data not found for product id: ${p.id}`);
  }
  return {
    ...p,
    image: imageData.imageUrl,
    imageHint: imageData.imageHint,
  };
});

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return products.find((p) => p.id === id);
}
