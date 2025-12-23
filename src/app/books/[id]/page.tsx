import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, BookOpen } from 'lucide-react';
import { getBooksBySubject } from '@/lib/data';
import { BookCard } from '@/components/book-card';
import { Separator } from '@/components/ui/separator';
import AddToCartButton from './add-to-cart-button';
import type { Book } from '@/lib/types';

async function getBookDetails(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    if (!response.ok) return null;
    const work = await response.json();

    let description = 'No description available.';
    if (work.description) {
      description = typeof work.description === 'string' ? work.description : work.description.value;
    }

    const authorsResponse = await fetch(`https://openlibrary.org${work.authors[0].author.key}.json`);
    const authorData = await authorsResponse.json();

    const coverId = work.covers?.[0];
    const coverImage = coverId
        ? {
            id: `cover-${work.key}`,
            imageUrl: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
            description: `Cover of ${work.title}`,
            imageHint: 'book cover'
          }
        : {
            id: 'default-cover',
            imageUrl: 'https://picsum.photos/seed/book/400/600',
            description: 'Default book cover',
            imageHint: 'book cover'
        };

    const book: Book = {
      id: id,
      title: work.title,
      author: authorData.name || 'Unknown Author',
      price: parseFloat((Math.random() * (20 - 10) + 10).toFixed(2)), // Placeholder price
      coverImage,
      categories: work.subjects?.slice(0, 3) || [],
      description,
      rating: work.ratings_average ? parseFloat(work.ratings_average.toFixed(1)) : parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      pageCount: work.number_of_pages || 0,
      publishedDate: work.first_publish_date || 'N/A',
      isbn: work.isbn_13?.[0] || work.isbn_10?.[0] || 'N/A',
    };
    return book;
  } catch (error) {
    console.error("Failed to fetch book details:", error);
    return null;
  }
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBookDetails(params.id);

  if (!book) {
    notFound();
  }
  
  const relatedBooks = book.categories.length > 0 ? (await getBooksBySubject(book.categories[0].toLowerCase().replace(/ /g, '_'), 5)).filter(b => b.id !== book.id).slice(0, 4) : [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex justify-center items-start">
           <div className="relative w-full max-w-sm aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden">
             <Image
                src={book.coverImage.imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                data-ai-hint={book.coverImage.imageHint}
              />
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(book.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{book.rating.toFixed(1)} / 5.0</span>
          </div>

          <p className="text-lg leading-relaxed text-foreground/80">{book.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
             <div className="flex items-center gap-2"><BookOpen className="h-4 w-4"/><span>{book.pageCount > 0 ? `${book.pageCount} pages` : 'N/A'}</span></div>
             <div className="flex items-center gap-2"><span>Published: {book.publishedDate}</span></div>
             <div className="flex items-center gap-2"><span>ISBN: {book.isbn}</span></div>
             <div className="flex items-center gap-2"><span>Categories: {book.categories.join(', ')}</span></div>
          </div>
          
          <Separator className="my-4" />

          <div className="bg-card p-6 rounded-2xl shadow-inner-lg space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-lg">Price</span>
              <p className="font-headline font-bold text-4xl text-primary">${book.price.toFixed(2)}</p>
            </div>
            
            <AddToCartButton book={book} />
          </div>

        </div>
      </div>
      
      {relatedBooks.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="font-headline text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBooks.map(relatedBook => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
