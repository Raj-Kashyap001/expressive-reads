'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Book } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useCart, useWishlist } from '@/contexts/app-context';
import { useToast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const isWishlisted = wishlist.some(item => item.book.id === book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    toast({
      title: 'Added to cart!',
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(book.id);
      toast({
        title: 'Removed from wishlist',
        description: `"${book.title}" has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(book);
      toast({
        title: 'Added to wishlist!',
        description: `"${book.title}" has been added to your wishlist.`,
      });
    }
  };

  return (
    <Link href={`/books/${book.id}`} className="block group">
      <div className={cn('bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2', className)}>
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <Image
            src={book.coverImage.imageUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={book.coverImage.imageHint}
          />
           <Button
            size="icon"
            className="absolute top-3 right-3 rounded-full bg-background/70 hover:bg-background text-foreground backdrop-blur-sm z-10 w-10 h-10"
            onClick={handleWishlistToggle}
          >
            <Heart className={cn('h-5 w-5 transition-colors', isWishlisted ? 'text-red-500 fill-red-500' : 'text-foreground/80')} />
          </Button>
        </div>
        <div className="p-4 flex flex-col">
          <h3 className="font-headline font-semibold text-lg truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm truncate">{book.author}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="font-bold text-lg text-primary">${book.price.toFixed(2)}</p>
            <Button
              size="icon"
              className="rounded-full shrink-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
