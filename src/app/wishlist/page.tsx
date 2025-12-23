'use client';

import { BookCard } from '@/components/book-card';
import { useWishlist, useCart } from '@/contexts/app-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Book } from '@/lib/types';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (book: Book) => {
    addToCart(book);
    removeFromWishlist(book.id);
    toast({
      title: 'Moved to Cart',
      description: `"${book.title}" has been moved to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Your Wishlist</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Books you love, saved for later.
        </p>
      </div>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {wishlist.map(item => (
            <div key={item.book.id} className="group relative">
              <BookCard book={item.book} />
              <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  className="w-full rounded-full bg-accent hover:bg-accent/90"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMoveToCart(item.book);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl shadow-lg">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h3 className="font-headline mt-6 text-2xl font-semibold">Your Wishlist is Empty</h3>
          <p className="text-muted-foreground mt-2">Add your favorite books to your wishlist to see them here.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/books">Start Browsing</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
