import type { ImagePlaceholder } from './placeholder-images';

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: ImagePlaceholder;
  categories: string[];
  description: string;
  rating: number;
  pageCount: number;
  publishedDate: string;
  isbn: string;
};

export type Category = {
    id: string;
    name: string;
    image: ImagePlaceholder;
}

export type CartItem = {
  book: Book;
  quantity: number;
};

export type WishlistItem = {
    book: Book;
};
