"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { apiClient } from "../axios/page";
import { toast } from "react-toastify";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  sizes: string[];
  _id: string;
}
interface User {
  username: string;
  lastName: string;
  email: string;
  id: string;
  liked: Product[];
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
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      setUser(response.data.user);
      router.replace("/");
      toast.success("Амжилттай нэвтэрлээ");
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      const res = await apiClient.get("/user/me", {
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

        const res = await apiClient.get("/user/me", {
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
