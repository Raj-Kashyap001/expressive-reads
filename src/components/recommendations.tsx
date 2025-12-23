import { getPersonalizedBookRecommendations, type PersonalizedBookRecommendationsInput } from '@/ai/flows/personalized-book-recommendations';
import { BookCard } from './book-card';
import { getBooksBySubject } from '@/lib/data';
import { Lightbulb } from 'lucide-react';
import type { Book } from '@/lib/types';

// This is a server component
export default async function Recommendations() {
  const browsingHistory: PersonalizedBookRecommendationsInput['browsingHistory'] = [
    {
      bookId: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      categories: ['Non-Fiction', 'Self-Help'],
    },
    {
      bookId: '5',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      categories: ['Non-Fiction', 'History'],
    },
  ];

  let recommendations: (Book & { reason: string })[] = [];
  try {
    const result = await getPersonalizedBookRecommendations({
      browsingHistory,
      numberOfRecommendations: 4,
    });
    
    const recBooks = await Promise.all(
      result.recommendations.map(async (rec, index) => {
        // Since we don't have a reliable way to search by title/author with the subject endpoint,
        // we'll fetch a list of books and see if we can find a match.
        // A better approach would be to use the search API if available.
        const booksFromApi = await getBooksBySubject(rec.categories[0] || 'fiction', 20);
        const existingBook = booksFromApi.find(b => b.title.toLowerCase().includes(rec.title.toLowerCase()));

        if (existingBook) {
          return { ...existingBook, reason: rec.reason };
        }

        // Fallback for AI-generated book not in the list from the API
        const fallbackBook = booksFromApi.length > index ? booksFromApi[index] : null;
        if(fallbackBook) {
            return {
                ...fallbackBook,
                title: rec.title, // Use AI title
                author: rec.author, // Use AI author
                reason: rec.reason 
            };
        }

        return null;
      })
    );
    
    recommendations = recBooks.filter((b): b is Book & { reason: string } => b !== null);


  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    // Fallback to showing some popular books if AI fails
    const fallbackBooks = await getBooksBySubject('popular', 4);
    recommendations = fallbackBooks.map(b => ({...b, reason: "Popular this week"}));
  }

  if (recommendations.length === 0) {
     const fallbackBooks = await getBooksBySubject('popular', 4);
    recommendations = fallbackBooks.map(b => ({...b, reason: "Popular this week"}));
  }

  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Recommended For You</h2>
            <p className="text-muted-foreground mt-2 md:mt-0 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                <span>Based on your recent activity</span>
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((book) => (
            <div key={book.id} className="flex flex-col gap-2">
                <BookCard book={book} />
                <div className="bg-background/50 p-3 rounded-lg text-center text-sm">
                    <p className="font-semibold text-primary">Why you'll like it:</p>
                    <p className="text-muted-foreground">{book.reason}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
