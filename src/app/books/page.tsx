'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookCard } from '@/components/book-card';
import { books, categories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function BooksPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 20]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.categories.map(c => c.toLowerCase().replace(' ', '-')).includes(selectedCategory);
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 20]);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Collection</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find your next adventure in our curated library of books and notebooks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-card rounded-2xl shadow-lg">
            <h2 className="font-headline text-2xl font-semibold mb-6">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="search" className="text-base font-semibold">Search</Label>
                 <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Title or author..."
                      className="pl-10 h-11 rounded-full bg-background"
                    />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base font-semibold mb-3">Category</h3>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="cat-all" />
                    <Label htmlFor="cat-all">All</Label>
                  </div>
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat.id} id={`cat-${cat.id}`} />
                      <Label htmlFor={`cat-${cat.id}`}>{cat.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />
              
              <div>
                 <h3 className="text-base font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

               <Separator />
              
              <Button onClick={handleResetFilters} variant="outline" className="w-full rounded-full">
                <X className="mr-2 h-4 w-4" /> Reset Filters
              </Button>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl">
              <h3 className="font-headline text-2xl font-semibold">No Books Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
