import { removeFromCart } from '@/lib/cart';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    if (!productId) {
      return new NextResponse('Missing product ID', { status: 400 });
    }
    const success = await removeFromCart(productId);
    if (!success) {
      return new NextResponse('Item not found in cart', { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
