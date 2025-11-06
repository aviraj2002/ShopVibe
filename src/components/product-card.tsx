'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square w-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <CardTitle className="text-sm sm:text-base font-headline font-semibold leading-tight">{product.name}</CardTitle>
        <CardDescription className="mt-2 text-lg sm:text-xl font-semibold text-primary">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm" aria-label={`Add ${product.name} to cart`}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
