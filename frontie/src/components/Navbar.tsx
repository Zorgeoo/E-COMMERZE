"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useProductContext } from "./utils/context";
import { apiClient } from "./axios/page";
import { toast } from "react-toastify";

interface Product {
  images: string[];
  productName: string;
  price: number;
  _id: string;
}
type Cart = {
  quantity: number;
  size: string;
  _id: string;
  cartProducts: {
    _id: string;
    price: number;
    productName: string;
    images: string[];
  };
};
export const Navbar = () => {
  const { user, setUser, getMe } = useProductContext();
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);

  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      setUser(undefined);
      toast.error("Амжилттай гарлаа");
    } catch (error) {
      console.log(error);
    }
  };
  const getCarts = async (userId: string) => {
    try {
      const res = await apiClient.get(`/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      });
      setCarts(res.data.carts);
      console.log(res.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await apiClient.get("/product");
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("Can not get products");
    }
  };
  useEffect(() => {
    getProducts();
    getMe();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getCarts(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (search.length > 0 && allProducts) {
      const filtered = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [search, allProducts]);

  return (
    <div className="bg-black">
      <div className="w-[1280px] py-4 px-6 m-auto flex text-[#FFFFFF] justify-between items-center">
        <div className="flex gap-4">
          <Link href={`/`}>
            <div>
              <Image src={`/Logo.png`} alt="Hello" width={32} height={32} />
            </div>
          </Link>
          <Link href={"/admin/dashboard"}>
            <div>Admin</div>
          </Link>
          <Link href={`/Category`}>
            <div>Ангилал</div>
          </Link>
          <div className=""></div>
        </div>
        <div className="relative">
          <input
            className="pl-8 bg-[#18181B] py-2 px-4 rounded-md outline-none"
            placeholder="Бүтээгдэхүүн хайх"
            onChange={(event) => setSearch(event?.target.value)}
            value={search}
          />
          <CiSearch className="absolute w-6 h-6 top-2 left-0" />
          {filteredProducts.length > 0 && (
            <div className="absolute bg-white text-black w-full mt-1 max-h-64 overflow-y-auto shadow-md rounded-lg z-20">
              {filteredProducts.map((product) => (
                <Link href={`${product._id}`} key={product._id}>
                  <div
                    onClick={() => setSearch("")}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="w-10 h-10 object-cover rounded mr-2"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{product.productName}</span>
                      <span className="text-gray-500">${product.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <Link href={`/liked`}>
              <div className="relative">
                <CiHeart className="w-6 h-6" />
                <div
                  className={`bg-[#2563EB] rounded-full px-1 text-xs absolute top-[-15%] right-[-15%]  ${
                    user?.liked?.length === 0 ? "hidden" : "block"
                  }`}
                >
                  {user?.liked?.length}
                </div>
              </div>
            </Link>
            <Link href={`/buysteps/cart`}>
              <div className="relative">
                <CiShoppingCart className="w-6 h-6" />
                <div
                  className={`bg-[#2563EB] rounded-full px-1 text-xs absolute top-[-15%] right-[-15%]  ${
                    carts.length === 0 ? "hidden" : "block"
                  }`}
                >
                  {carts?.length}
                </div>
              </div>
            </Link>
            <Link href={`/userinfo`}>
              <div>
                <CiUser className="w-6 h-6" />
              </div>
            </Link>
          </div>
          <div className="flex ">
            <div className={`flex gap-2 ${user ? "hidden" : "flex"} `}>
              <Link href={`/register`}>
                <button className="border border-[#2563EB] rounded-md py-2 px-3">
                  Бүртгүүлэх
                </button>
              </Link>
              <Link href={`/login`}>
                <button className="bg-[#2563EB] rounded-md py-2 px-3">
                  Нэвтрэх
                </button>
              </Link>
            </div>
            <div
              className={`flex gap-4 items-center ${user ? "flex" : "hidden"}`}
            >
              <div>{user?.username}</div>
              <button
                onClick={logOut}
                className="border rounded-full px-3 py-2"
              >
                Гарах
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
