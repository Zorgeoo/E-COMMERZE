"use client";
import { ProductCard } from "@/components/co-components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const productData = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
  { img: "/magazine.png", title: "The Prompt magazine", price: 126000 },
  { img: "/Waterbottle.png", title: "Bottle", price: 127000 },
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Sweater", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
  { img: "/magazine.png", title: "The Prompt magazine", price: 126000 },
  { img: "/Waterbottle.png", title: "Bottle", price: 127000 },
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Sweater", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
];

const categoriesData = [
  "Малгай",
  "Усны сав",
  "T-shirt",
  "Hoodie",
  "Tee",
  "Цүнх",
];
const sizeData = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
}
interface ProductsType {
  products: Product[];
}

interface Category {
  categoryName: string;
  _id: string;
}

interface CategoriesType {
  categories: Category[];
}

export const Category = () => {
  const [allProducts, setAllProducts] = useState<ProductsType | null>(null);
  const [allCategories, setAllCategories] = useState<CategoriesType | null>(
    null
  );
  const [filterType, setFilterType] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/category/");
      setAllCategories(response.data);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/product/");
      setAllProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const filterProducts = () => {
    if (allProducts) {
      const products =
        filterType !== "All"
          ? allProducts?.products.filter((product) =>
              product.categoryId.includes(filterType)
            )
          : allProducts?.products;
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    getProducts(), getCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterType, allProducts]);

  const handleFilter = (id: string) => {
    if (filterType === id) {
      setFilterType("All");
    } else {
      setFilterType(id);
    }
  };

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
                      checked={filterType === item._id}
                      onClick={() => handleFilter(item._id)}
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
              {sizeData.map((item, index) => {
                return (
                  <label key={index}>
                    <input type="checkbox" id="cap" />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[2147px] w-[774px] grid grid-cols-3 grid-rows-5 gap-x-5 gap-y-12">
          {filteredProducts.slice(0, 6).map((item, index) => {
            const customHeight =
              index === 7 ? "764px" : index === 8 ? "764px" : "331px";
            return (
              <div key={index}>
                <Link href={`/Detail`}>
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
export default Category;
