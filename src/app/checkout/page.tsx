'use client';

import { useCart } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const shippingCost = cart.length > 0 ? 5.00 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/30" />
        <h1 className="mt-6 font-headline text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">You can't proceed to checkout with an empty cart.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/books">Go Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left side: Shipping and Payment */}
        <div className="bg-card p-8 rounded-2xl shadow-lg space-y-8">
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1"><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="John" className="rounded-full" /></div>
              <div className="space-y-1"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Doe" className="rounded-full" /></div>
              <div className="sm:col-span-2 space-y-1"><Label htmlFor="address">Address</Label><Input id="address" placeholder="123 Book St" className="rounded-full" /></div>
              <div className="space-y-1"><Label htmlFor="city">City</Label><Input id="city" placeholder="Bookville" className="rounded-full" /></div>
              <div className="space-y-1"><Label htmlFor="state">State</Label><Input id="state" placeholder="BK" className="rounded-full" /></div>
              <div className="space-y-1"><Label htmlFor="zip">ZIP Code</Label><Input id="zip" placeholder="12345" className="rounded-full" /></div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
               <div className="space-y-1"><Label htmlFor="card-number">Card Number</Label><Input id="card-number" placeholder="**** **** **** 1234" className="rounded-full"/></div>
               <div className="space-y-1"><Label htmlFor="card-name">Name on Card</Label><Input id="card-name" placeholder="John Doe" className="rounded-full"/></div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1"><Label htmlFor="expiry">Expiration</Label><Input id="expiry" placeholder="MM/YY" className="rounded-full"/></div>
                 <div className="space-y-1"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" className="rounded-full"/></div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Order Summary */}
        <div className="bg-card p-8 rounded-2xl shadow-lg space-y-6 h-fit sticky top-24">
          <h2 className="font-headline text-2xl font-semibold">Order Summary</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.book.id} className="flex items-center gap-4">
                <div className="relative h-16 w-12 rounded-md overflow-hidden shrink-0">
                  <Image src={item.book.coverImage.imageUrl} alt={item.book.title} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold truncate">{item.book.title}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between"><p>Subtotal</p><p>${cartTotal.toFixed(2)}</p></div>
            <div className="flex justify-between"><p>Shipping</p><p>${shippingCost.toFixed(2)}</p></div>
            <div className="flex justify-between text-muted-foreground"><p>Taxes (8%)</p><p>${tax.toFixed(2)}</p></div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-xl">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <Button size="lg" className="w-full rounded-full h-12 text-base">
            <Lock className="mr-2 h-5 w-5" /> Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
