"use client";
import { ProductCard } from "@/components/co-components/ProductCard";
import { useEffect, useState } from "react";
import { apiClient } from "@/components/axios/page";

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

const Category = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [allCategories, setAllCategories] = useState<CategoriesType | null>(
    null
  );
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterBySize, setFilterBySize] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getCategories = async () => {
    try {
      const response = await apiClient.get("/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllCategories(response.data);
    } catch (error) {
      console.log("Can not get categories");
    }
  };

  const getProductsFilter = async () => {
    try {
      const response = await apiClient.get(`/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { categoryId: filterType, sizes: filterBySize, page },
      });
      setAllProducts(response.data.products);
      setTotal(response.data.totalCount);
    } catch (error) {
      console.log("can not get products");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProductsFilter();
  }, [filterType, filterBySize, page]);

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

  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        <div className="flex flex-col gap-12 pr-40">
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
        <div>
          <div className="h-fit w-[774px] grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-12">
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
          <div className="flex gap-6 w-fit m-auto pt-10">
            {new Array(Math.ceil(total / 6)).fill(0).map((_, index) => (
              <div
                onClick={() => setPage(index + 1)}
                key={index}
                className={`cursor-pointer border rounded-full py-2 px-4 ${
                  page === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
