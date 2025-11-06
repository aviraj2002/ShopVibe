import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { getProducts } from '@/lib/products';
import { CartSheet } from '@/components/cart-sheet';
import { CheckoutDialog } from '@/components/checkout-dialog';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-headline font-bold text-center mb-8">
          Our Products
        </h1>
        <ProductGrid products={products} />
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
