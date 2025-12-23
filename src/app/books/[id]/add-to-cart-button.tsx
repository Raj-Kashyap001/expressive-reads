'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/app-context';
import { useToast } from '@/hooks/use-toast';
import { Book } from '@/lib/types';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export default function AddToCartButton({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(book, quantity);
    toast({
      title: `${quantity} × "${book.title}" added!`,
      description: 'Your cart has been updated.',
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
          onClick={() => setQuantity(q => q + 1)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <Button size="lg" className="flex-1 rounded-full h-14 text-lg" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}
