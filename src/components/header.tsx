
'use client';

import Link from 'next/link';
import { BookHeart, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/app-context';
import { CartSheet } from './cart-sheet';
import React from 'react';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/#new-arrivals', label: 'New Arrivals' },
  { href: '/books?category=notebooks', label: 'Notebooks' },
];

export function Header() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? 'border-b bg-background/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <BookHeart className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold tracking-tight">Expressive Reads</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="w-full rounded-full bg-muted pl-10 h-11"
              />
            </div>

            <ThemeToggle />

            <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex rounded-full">
              <Link href="/wishlist">
                <BookHeart className="h-6 w-6" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative rounded-full" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>

            <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex rounded-full">
              <Link href="/login">
                <User className="h-6 w-6" />
                <span className="sr-only">User Profile</span>
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/wishlist" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary">
                    <BookHeart/> Wishlist
                  </Link>
                   <Link href="/login" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary">
                    <User/> Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
