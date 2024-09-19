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

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/product/");
      setAllProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="w-[1280px] m-auto p-14">
        <div className="h-[3000px] w-full grid grid-cols-4 grid-rows-7 gap-x-5 gap-y-8 [&>div:nth-child(1)]:col-span-4 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2 [&>div:nth-child(9)]:row-span-2 [&>div:nth-child(9)]:col-span-2">
          {allProducts?.map((item, index) => {
            const customHeight =
              index === 7 ? "764px" : index === 8 ? "764px" : "331px";
            return (
              <div key={index}>
                <Link href={`${item._id}`}>
                  <ProductCard
                    img={item.images[0]}
                    title={item.productName}
                    price={item.price}
                    customHeight={customHeight}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
