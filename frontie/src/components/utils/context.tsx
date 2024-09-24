"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios from "axios";

// Define the type for the context value

interface User {
  username: string;
  email: string;
  id: string;
}

interface ProductContextProviderProps {
  children: ReactNode;
}

// Initialize the context with a default value of `null` or the correct type
export const ProductContext = createContext<ProductContextType | null>(null);

// Define the props for the Provider component
interface ProductContextType {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  login: (email: string, password: string) => Promise<void>; // Add the login function type
  user: User | undefined; // Optional user state
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  // Initialize state with a type annotation
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      setUser(response.data.user);
      console.log(response.data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider value={{ totalPrice, setTotalPrice, login, user }}>
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
