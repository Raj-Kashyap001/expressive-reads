import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { books } from '@/lib/data';
import { BookCard } from '@/components/book-card';
import Recommendations from '@/components/recommendations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const newArrivals = [...books].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 8);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image-1');

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 pb-12">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover object-center"
                priority
                data-ai-hint={heroImage.imageHint}
              />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 text-foreground">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Discover Your Next Chapter
          </h1>
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Explore a world of stories, from timeless classics to the latest bestsellers. Your literary adventure starts here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full text-lg h-14 px-8">
              <Link href="/books">
                Browse Books <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-2">
              <Link href="#new-arrivals">
                New Arrivals <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="new-arrivals" className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground mt-2 md:mt-0">Fresh off the press, just for you.</p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {newArrivals.map((book) => (
              <CarouselItem key={book.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                  <BookCard book={book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <Recommendations />

      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.slice(4, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full text-lg h-14 px-8">
              <Link href="/books">
                Explore All Books <ShoppingCart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
      </section>
    </div>
  );
}
