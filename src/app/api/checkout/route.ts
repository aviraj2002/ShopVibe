import { clearCart } from '@/lib/cart';
import { NextResponse } from 'next/server';
import type { CartItem } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { cartItems, userDetails } = await request.json();

    if (!cartItems || !Array.isArray(cartItems) || !userDetails) {
      return new NextResponse('Missing cartItems or userDetails', {
        status: 400,
      });
    }

    const total = cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );

    await clearCart();

    const receipt = {
      total: total,
      timestamp: new Date().toISOString(),
      items: cartItems,
      user: userDetails,
    };

    return NextResponse.json(receipt);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
