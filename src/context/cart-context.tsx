'use client';

import type { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface CartState {
  cartItems: CartItem[];
  itemCount: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  checkout: (userDetails: { name: string; email: string }) => Promise<any>;
  isLoading: boolean;
  receipt: any | null;
  setReceipt: (receipt: any | null) => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [receipt, setReceipt] = useState<any | null>(null);

  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCartItems(data.items);
      setTotal(data.total);
      setItemCount(
        data.items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
      );
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not load your cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error('Failed to add item to cart');
      const addedItem = await res.json();
      toast({
        title: 'Added to Cart',
        description: `${addedItem.name} has been added to your cart.`,
      });
      await fetchCart();
      setIsCartOpen(true);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not add item to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to remove item from cart');
      toast({
        title: 'Item Removed',
        description: 'The item has been removed from your cart.',
      });
      await fetchCart();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not remove item. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkout = async (userDetails: { name: string; email: string }) => {
    if (cartItems.length === 0) {
      toast({ title: "Your cart is empty.", variant: 'destructive'});
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, userDetails }),
      });
      if (!res.ok) throw new Error('Checkout failed');
      const receiptData = await res.json();
      setReceipt(receiptData);
      await fetchCart();
      setIsCartOpen(false);
      return receiptData;
    } catch (error) {
       console.error(error);
      toast({
        title: 'Error',
        description: 'Checkout failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const value = {
    cartItems,
    itemCount,
    total,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addToCart,
    removeFromCart,
    checkout,
    isLoading,
    receipt,
    setReceipt,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
