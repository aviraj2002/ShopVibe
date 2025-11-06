'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useCart } from '@/context/cart-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Separator } from './ui/separator';
import { CheckCircle, PartyPopper } from 'lucide-react';
import Image from 'next/image';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export function CheckoutDialog() {
  const { isCheckoutOpen, setIsCheckoutOpen, checkout, receipt, setReceipt, isLoading } = useCart();
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', email: '' },
  });

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    await checkout(values);
    form.reset();
  }

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Delay setting receipt to null to allow for closing animation
    setTimeout(() => {
        setReceipt(null);
    }, 300);
  }

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {receipt ? (
            // Receipt View
            <>
                <DialogHeader className="text-center">
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                        <PartyPopper className="h-10 w-10 text-primary" />
                    </div>
                    <DialogTitle className="font-headline text-2xl">Thank You!</DialogTitle>
                    <DialogDescription>Your order has been placed.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className='p-4 bg-muted/50 rounded-lg'>
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <p><strong>Order Total:</strong> ${receipt.total.toFixed(2)}</p>
                        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleDateString()}</p>
                        <p><strong>Billed to:</strong> {receipt.user.name} ({receipt.user.email})</p>
                    </div>
                    <div className='max-h-48 overflow-y-auto pr-2'>
                        {receipt.items.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4 py-2">
                                <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" />
                                <div className="flex-1">
                                    <p className='font-medium'>{item.name}</p>
                                    <p className='text-sm text-muted-foreground'>Qty: {item.quantity}</p>
                                </div>
                                <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleClose} className="w-full">Continue Shopping</Button>
                </DialogFooter>
            </>
        ) : (
            // Checkout Form View
            <>
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Checkout</DialogTitle>
                <DialogDescription>
                Please enter your details to complete your purchase.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>
                </DialogFooter>
                </form>
            </Form>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
