'use client';

import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { useCart } from '@/contexts/app-context';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="font-headline text-2xl flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
          </SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {cart.map(item => (
                  <div key={item.book.id} className="flex gap-4">
                    <div className="relative h-24 w-16 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.book.coverImage.imageUrl}
                        alt={item.book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 10vw, 5vw"
                        data-ai-hint={item.book.coverImage.imageHint}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold leading-tight">{item.book.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.book.author}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                           <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-5 text-center font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold">${(item.book.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full self-start" onClick={() => removeFromCart(item.book.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                      </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 border-t bg-muted/50">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                 <Button asChild size="lg" className="w-full rounded-full h-12 text-base">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full rounded-full h-12 text-base">
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/50 mb-4" />
            <h3 className="font-headline text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Looks like you haven't added any books yet.</p>
            <SheetClose asChild>
              <Button asChild variant="outline" className="mt-6 rounded-full">
                <Link href="/books">Start Browsing</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
