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

interface User {
  username: string;
  lastName: string;
  email: string;
  id: string;
  liked: any[];
  address: string;
  phoneNumber: string;
}

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextType | null>(null);

interface ProductContextType {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  login: (email: string, password: string) => Promise<void>;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  getMe: () => void;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3004/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      setUser(response.data.user);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      const res = await axios.get("http://localhost:3004/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token"); //Local storage-s tokenoo avna.

        if (!token) return; //token bhgui bol duusgana.

        const res = await axios.get("http://localhost:3004/user/me", {
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

  if (loading) {
    return <div>Loading...</div>;
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
