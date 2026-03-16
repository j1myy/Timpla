import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---
export type User = {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  favoriteDrink?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

type AppContextType = {
  // Auth
  user: User | null;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  isAuthenticated: boolean;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, name: string) => {
    const mockUser: User = {
      name: name || email.split('@')[0],
      email: email,
      bio: "Coffee enthusiast | Local explorer",
      favoriteDrink: "Barako Gold Espresso"
    };
    setUser(mockUser);
  };

  const signup = (email: string, name: string) => login(email, name);
  const logout = () => setUser(null);
  
  const updateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  // --- Cart State ---
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider value={{ 
      user, login, signup, logout, updateProfile, isAuthenticated: !!user,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
