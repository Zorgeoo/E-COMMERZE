"use client";
import { ProductCard } from "@/components/co-components/ProductCard";
import { use, useEffect, useState } from "react";
import axios from "axios";

const sizeData = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  sizes: string[];
  _id: string;
}

interface Category {
  categoryName: string;
  _id: string;
}

interface CategoriesType {
  categories: Category[];
}

export const Category = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [allCategories, setAllCategories] = useState<CategoriesType | null>(
    null
  );
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterBySize, setFilterBySize] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category/");
      setAllCategories(response.data);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const getProductsFilter = async (categoryId: string[], sizes: string[]) => {
    try {
      const response = await axios.get(`http://localhost:3001/product`, {
        params: { categoryId: filterType, sizes: filterBySize },
      });
      setAllProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProductsFilter(filterType, filterBySize);
  }, [filterType, filterBySize]);

  const handleFilter = (id: string) => {
    if (filterType.includes(id)) {
      setFilterType(filterType.filter((filterId) => filterId !== id));
    } else {
      setFilterType([...filterType, id]);
    }
  };

  const handleSizeFilter = (size: string) => {
    if (filterBySize.includes(size)) {
      setFilterBySize(filterBySize.filter((size) => size !== size));
    } else {
      setFilterBySize([...filterBySize, size]);
    }
  };
  console.log(filterType);

  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        <div className="flex flex-col gap-12 border pr-40">
          <div>
            <div className="font-bold">Ангилал</div>
            <div className="flex flex-col gap-2 pt-4">
              {allCategories?.categories.map((item, index) => {
                return (
                  <label key={index}>
                    <input
                      type="checkbox"
                      id="cap"
                      checked={filterType.includes(item._id)}
                      onChange={() => handleFilter(item._id)}
                    />
                    {item.categoryName}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <div className="font-bold">Хэмжээ</div>
            <div className="flex flex-col gap-2 pt-4">
              {sizeData.map((size, index) => {
                return (
                  <label key={index}>
                    <input
                      type="checkbox"
                      id="cap"
                      checked={filterBySize.includes(size)}
                      onClick={() => handleSizeFilter(size)}
                    />
                    {size}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[2147px] w-[774px] grid grid-cols-3 grid-rows-5 gap-x-5 gap-y-12">
          {allProducts?.slice(0, 6).map((item, index) => {
            const customHeight =
              index === 7 ? "764px" : index === 8 ? "764px" : "331px";
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
export default Category;
