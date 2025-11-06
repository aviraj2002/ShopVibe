import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { getProducts } from '@/lib/products';
import { CartSheet } from '@/components/cart-sheet';
import { CheckoutDialog } from '@/components/checkout-dialog';
import type { Product } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { HeroCarousel } from '@/components/hero-carousel';

export default async function Home() {
  const products = await getProducts();

  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel products={products} />
        {Object.entries(categories).map(([category, products], index) => (
          <section key={category} className="mb-12 mt-8">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-6">
              {category}
            </h2>
            <ProductGrid products={products} />
            {index < Object.keys(categories).length - 1 && (
              <Separator className="my-8" />
            )}
          </section>
        ))}
      </main>
      <footer className="w-full bg-primary/10 py-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopVibe. All rights reserved.</p>
        </div>
      </footer>
      <CartSheet />
      <CheckoutDialog />
    </div>
  );
}
