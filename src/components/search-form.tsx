'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  initialSearch?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  showButton?: boolean;
}

export function SearchForm({
  initialSearch = '',
  className,
  inputClassName,
  buttonClassName,
  showButton = true,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn('relative', className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books, authors..."
        className={cn('pl-11', inputClassName)}
      />
      {showButton && (
        <Button
          type="submit"
          size="lg"
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-6',
            buttonClassName
          )}
        >
          Search
        </Button>
      )}
    </form>
  );
}
