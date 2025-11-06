'use client';

import * as React from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import Autoplay from "embla-carousel-autoplay"
import { useCart } from '@/context/cart-context';

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const { addToCart } = useCart();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  const featuredProducts = products.slice(0, 5);

  return (
    <section className="w-full">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {featuredProducts.map((product) => (
            <CarouselItem key={product.id}>
              <div className="p-1">
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-video">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                        ${product.price.toFixed(2)}
                      </CardDescription>
                      <Button onClick={() => addToCart(product.id, 1)} className="mt-6 w-full sm:w-auto" size="lg">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
