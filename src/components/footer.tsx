import Link from 'next/link';
import { BookHeart, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <BookHeart className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold tracking-tight text-foreground">Expressive Reads</span>
            </Link>
            <p>Discover your next favorite book with us. Curated collections, new arrivals, and more.</p>
            <div className="flex gap-4 mt-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/books" className="hover:text-primary transition-colors">All Books</Link></li>
              <li><Link href="/books?category=fiction" className="hover:text-primary transition-colors">Fiction</Link></li>
              <li><Link href="/books?category=non-fiction" className="hover:text-primary transition-colors">Non-Fiction</Link></li>
              <li><Link href="/books?category=notebooks" className="hover:text-primary transition-colors">Notebooks</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get the latest on sales, new releases and more.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" className="rounded-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Expressive Reads. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
