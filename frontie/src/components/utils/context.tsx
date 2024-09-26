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
  liked: any[];
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
  user: User | null; // Optional user state
  setUser: (user: User | null) => void;
  getMe: () => void;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  // Initialize state with a type annotation
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token"); //Local storage-s tokenoo avna.

        if (!token) return; //token bhgui bol duusgana.

        const res = await axios.get("http://localhost:3001/user/me", {
          headers: {
            Authorization: `Bearer ${token}`, //Hervee token baival user ooriin mdeellee avna. buh huseltuud headers deer tokenoo yvuulna.
          },
        });

        setUser(res.data);
      } catch (err) {
        // localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const getMe = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while user data is being fetched
  }

  return (
    <ProductContext.Provider
      value={{ totalPrice, setTotalPrice, login, user, setUser, getMe }}
    >
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
