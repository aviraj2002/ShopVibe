import { CartItem } from './types';
import { getProduct } from './products';

// This is a simple in-memory "database" for the cart.
// In a real application, this would be a database like MongoDB or SQLite.
let cart: CartItem[] = [];

export async function getCart() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { items: cart, total };
}

export async function addToCart(productId: string, quantity: number) {
  const product = await getProduct(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
    return cart[existingItemIndex];
  } else {
    const newItem: CartItem = {
      ...product,
      quantity,
    };
    cart.push(newItem);
    return newItem;
  }
}

export async function removeFromCart(productId: string) {
  const initialLength = cart.length;
  cart = cart.filter((item) => item.id !== productId);
  return cart.length < initialLength;
}

export async function clearCart() {
  cart = [];
  return true;
}
