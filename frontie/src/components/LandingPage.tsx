"use client";
import Link from "next/link";
import axios from "axios";
import { ProductCard } from "./co-components/ProductCard";
import { useEffect, useState } from "react";

interface Product {
  images: string[];
  productName: string;
  price: number;
  _id: string;
}

export const LandingPage = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [filterBySize, setFilterBySize] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(20);

  const getProductsFilter = async (categoryId: string[], sizes: string[]) => {
    try {
      const response = await axios.get(`http://localhost:3001/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { categoryId: filterType, sizes: filterBySize, limit },
      });
      setAllProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getProductsFilter(filterType, filterBySize);
  }, []);

  return (
    <div>
      <div className="w-[1280px] m-auto p-14">
        <div className="h-[3180px] w-full grid grid-cols-4 grid-rows-7 gap-x-5 gap-y-8 [&>div:nth-child(1)]:col-span-4 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2 [&>div:nth-child(9)]:row-span-2 [&>div:nth-child(9)]:col-span-2">
          {allProducts?.map((item, index) => {
            const customHeight =
              index === 7 ? "729px" : index === 8 ? "729px" : "331px";
            return (
              <div key={index}>
                <ProductCard
                  img={item.images[0]}
                  title={item.productName}
                  price={item.price}
                  customHeight={customHeight}
                  id={item._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
