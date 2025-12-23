import { getPersonalizedBookRecommendations, type PersonalizedBookRecommendationsInput } from '@/ai/flows/personalized-book-recommendations';
import { BookCard } from './book-card';
import { books } from '@/lib/data';
import { Lightbulb } from 'lucide-react';

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

  let recommendations = [];
  try {
    const result = await getPersonalizedBookRecommendations({
      browsingHistory,
      numberOfRecommendations: 4,
    });
    
    // The AI might return books not in our mock DB. We will map them to our DB or create temporary book objects.
    // For this demo, let's try to find them in our mock `books` data.
    recommendations = result.recommendations.map((rec, index) => {
      const existingBook = books.find(b => b.title.toLowerCase() === rec.title.toLowerCase());
      if (existingBook) {
        return { ...existingBook, reason: rec.reason };
      }
      // If book not in DB, create a temporary one for display
      return {
        id: `ai-${index}`,
        title: rec.title,
        author: rec.author,
        price: 14.99, // a default price
        coverImage: books[index % books.length].coverImage, // use a random cover
        categories: rec.categories,
        description: rec.reason,
        rating: 4.5,
        pageCount: 300,
        publishedDate: '2022-01-01',
        isbn: '000-0-00-000000-0',
        reason: rec.reason
      };
    });

  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    // Fallback to showing some popular books if AI fails
    recommendations = books.slice(0, 4).map(b => ({...b, reason: "Popular this week"}));
  }

  if (recommendations.length === 0) {
    return null;
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
