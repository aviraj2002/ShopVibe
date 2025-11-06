import type { Product } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const productData: Omit<Product, 'image' | 'imageHint' >[] = [
  { id: 'prod_001', name: 'Aura Headphones', price: 299.99, category: 'Electronics' },
  { id: 'prod_002', name: 'Chrono Watch', price: 449.50, category: 'Fashion' },
  { id: 'prod_003', name: 'Hydro Flask', price: 45.00, category: 'Appliances' },
  { id: 'prod_004', name: 'Leather Tome', price: 75.00, category: 'Fashion' },
  { id: 'prod_005', name: 'Serenity Candles', price: 32.99, category: 'Appliances' },
  { id: 'prod_006', name: 'TypeMaster Keyboard', price: 189.99, category: 'Electronics' },
  { id: 'prod_007', name: 'SonicBoom Speaker', price: 120.00, category: 'Electronics' },
  { id: 'prod_008', name: 'Lumina Lamp', price: 89.95, category: 'Appliances' },
  { id: 'prod_011', name: 'Denim Jacket', price: 129.99, category: 'Fashion' },
  { id: 'prod_012', name: 'Smart Fridge', price: 2499.00, category: 'Appliances' },
];

export const products: Product[] = productData.map((p) => {
  const imageData = PlaceHolderImages.find((img) => img.id === p.id);
  if (!imageData) {
    // Use a default placeholder if no image is found for new products
    return {
      ...p,
      image: `https://picsum.photos/seed/${p.id}/600/600`,
      imageHint: p.category.toLowerCase(),
    };
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
