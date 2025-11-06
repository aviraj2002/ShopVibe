import { getCart, addToCart } from '@/lib/cart';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cart = await getCart();
    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    if (!productId || !quantity) {
      return new NextResponse('Missing productId or quantity', { status: 400 });
    }
    const newItem = await addToCart(productId, quantity);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Product not found') {
        return new NextResponse(error.message, { status: 404 });
    }
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
