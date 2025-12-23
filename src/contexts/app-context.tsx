'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book, CartItem, WishlistItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Helper to get initial state from localStorage
const getInitialState = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Cart Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Wishlist Context
interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Combined Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getInitialState<CartItem[]>('cart', []));
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => getInitialState<WishlistItem[]>('wishlist', []));
  const [cartTotal, setCartTotal] = useState(0);

  const { toast } = useToast();

  // Sync state with localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart));
      const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
      setCartTotal(total);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [wishlist]);

  // Cart methods
  const addToCart = (book: Book, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.book.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.book.id === bookId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist methods
  const addToWishlist = (book: Book) => {
    setWishlist(prev => {
      if (prev.some(item => item.book.id === book.id)) {
        return prev;
      }
      return [...prev, { book }];
    });
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(prev => prev.filter(item => item.book.id !== bookId));
  };
  
  const isWishlisted = (bookId: string) => wishlist.some(item => item.book.id === bookId);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

// Custom hooks
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within an AppProvider');
  }
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within an AppProvider');
  }
  return context;
};
