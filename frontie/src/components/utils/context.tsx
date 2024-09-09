"use client";

import { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the context value
interface ProductContextType {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

// Initialize the context with a default value of `null` or the correct type
export const ProductContext = createContext<ProductContextType | null>(null);

// Define the props for the Provider component
interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  // Initialize state with a type annotation
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <ProductContext.Provider value={{ totalPrice, setTotalPrice }}>
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};
