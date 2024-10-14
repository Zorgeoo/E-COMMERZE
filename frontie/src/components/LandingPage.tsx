"use client";
import { ProductCard } from "./co-components/ProductCard";
import { useEffect, useState } from "react";
import { useProductContext } from "./utils/context";
import { apiClient } from "./axios/page";

interface Product {
  images: string[];
  productName: string;
  price: number;
  _id: string;
}

export const LandingPage = () => {
  const { getMe } = useProductContext();
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);

  const getProductsFilter = async () => {
    try {
      const response = await apiClient.get(`/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("can not get products");
    }
  };

  useEffect(() => {
    getProductsFilter();
    getMe();
  }, []);

  return (
    <div>
      <div className="w-[1280px] m-auto p-14">
        hi
        <div className="h-fit w-full grid grid-cols-4 gap-x-5 gap-y-8 [&>div:nth-child(1)]:col-span-4 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2 [&>div:nth-child(9)]:row-span-2 [&>div:nth-child(9)]:col-span-2">
          {allProducts?.map((item, index) => {
            const customHeight =
              index === 7 ? "755px" : index === 8 ? "755px" : "331px";
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
