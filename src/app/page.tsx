import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getBooksBySubject } from '@/lib/data';
import { BookCard } from '@/components/book-card';
import Recommendations from '@/components/recommendations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const newArrivals = await getBooksBySubject('new', 8);
  const featured = await getBooksBySubject('thriller', 4);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image-1');

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 pb-12">
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          
          <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/20">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shadow-lg">
              Discover Your Next Chapter
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
              Explore a world of stories, from timeless classics to the latest bestsellers. Your literary adventure starts here.
            </p>
            
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for your next favorite book..."
                  className="w-full rounded-full bg-background/90 text-foreground h-16 pl-14 pr-32 text-lg border-2 border-transparent focus:border-primary focus:ring-primary"
                />
                <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-6">
                  Search
                </Button>
              </div>
            </div>

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
          {featured.map((book) => (
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
