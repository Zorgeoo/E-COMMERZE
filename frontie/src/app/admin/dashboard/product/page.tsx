"use client";
import { LuShapes } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { strict } from "assert";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: Category[];
  _id: string;
  createdAt: string;
  reviewCount: number;
}
interface Category {
  categoryName: string;
  _id: string;
}

export default function home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >(undefined);
  const [search, setSearch] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [filterByCategory, setFilterByCategory] = useState<string | undefined>(
    undefined
  );
  const [sortByPrice, setSortByPrice] = useState<string | undefined>(undefined);
  const [sortByDate, setSortByDate] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(true);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3004/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllCategories(response.data.categories);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete("http://localhost:3004/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { productId },
      });
      getProducts(filterByCategory);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (categoryId: string | undefined) => {
    try {
      const response = await axios.get("http://localhost:3004/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { categoryId: filterByCategory },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getProducts(filterByCategory);
  }, [filterByCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (search.length > 0 || sortByPrice || sortByDate) {
      const filtered = allProducts
        ?.filter((product) =>
          product.productName.toLocaleLowerCase().includes(search)
        )
        .sort((a, b) => {
          if (sortByPrice === "highest") {
            return a.price - b.price;
          } else if (sortByPrice === "lowest") {
            return b.price - a.price;
          }
          return 0;
        })
        .sort((a, b) => {
          if (sortByDate === "old") {
            return a.price - b.price;
          } else if (sortByDate === "new") {
            return b.price - a.price;
          }
          return 0;
        });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [search, allProducts, sortByPrice, sortByDate]);

  return (
    <div className="bg-[#1C20240A] h-screen p-4">
      <div className="w-[985px] m-auto flex gap-4">
        <div className="flex w-full">
          <div className={`flex-col w-full gap-6`}>
            <div className="flex border-b">
              <div
                className={`px-4 text-sm py-4 cursor-pointer ${
                  page ? "border-black border-b-2 font-semibold" : ""
                }`}
                onClick={() => setPage(true)}
              >
                Бүтээгдэхүүн
              </div>
              <div
                className={`px-4 text-sm text-[#3F4145] py-4 cursor-pointer ${
                  !page ? "border-black border-b-2 font-semibold" : ""
                }`}
                onClick={() => setPage(false)}
              >
                Ангилал
              </div>
            </div>
            <div className={`${page ? "block" : "hidden"}`}>
              <Link href={`/admin/dashboard/product/addproduct`}>
                <div className="text-white flex gap-2 bg-black px-12 py-2 my-2 items-center rounded-xl w-fit font-semibold">
                  <div>+</div>
                  <div>Бүтээгдэхүүн нэмэх</div>
                </div>
              </Link>
              <div className={`flex justify-between h-10 my-2`}>
                <div className="flex gap-3  ">
                  <div className="flex items-center gap-2 font-semibold bg-white rounded-lg">
                    <div className="pl-3">
                      <LuShapes />
                    </div>
                    <Select
                      onValueChange={(category) =>
                        setFilterByCategory(category)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ангилал" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">Бүгд</SelectItem>
                        {allCategories?.map((category, index) => {
                          return (
                            <SelectItem key={index} value={category._id}>
                              {category.categoryName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 font-semibold pr-3 bg-white rounded-lg ">
                    <Select onValueChange={(value) => setSortByPrice(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Үнээр" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highest">Өсөхөөр</SelectItem>
                        <SelectItem value="lowest">Буурахаар</SelectItem>
                      </SelectContent>
                    </Select>
                    <div>
                      <FaArrowDown
                        className={`${
                          sortByPrice === "highest" ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-semibold pl-3 bg-white rounded-lg ">
                    <div>
                      <FaRegCalendar />
                    </div>
                    <Select onValueChange={(value) => setSortByDate(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Хугацаагаар" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Шинэ нь эхэнд</SelectItem>
                        <SelectItem value="old">Хуучин нь эхэнд</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
                  <div>
                    <IoSearchSharp />
                  </div>
                  <input
                    className="outline-none w-[200px]"
                    placeholder="Бүтээгдэхүүний нэр"
                    value={search}
                    onChange={(event) => setSearch(event?.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-col bg-white rounded-[12px]">
                <div className="flex w-full h-11 items-center">
                  <div className="w-[5%] text-center"> </div>
                  <div className="w-[25%] text-center ">Бүтээгдэхүүн</div>
                  <div className="w-[15%] text-center flex justify-center">
                    Ангилал
                  </div>
                  <div className="w-[10%] text-center flex justify-center">
                    Үнэ
                  </div>
                  <div className="w-[10%] text-center ">Үлдэгдэл</div>
                  <div className="w-[20%] text-center">Нэмсэн огноо</div>
                  <div className="w-[15%]"></div>
                </div>
                {filteredProducts?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex border-t h-[72px] text-sm w-full"
                    >
                      <div className="w-[5%] flex justify-center items-center"></div>
                      <div className="w-[25%] flex gap-3 justify-center -red-600 items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={item.images[0]}
                            fill
                            alt="aa"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-semibold text-sm">
                            {item.productName}
                          </div>
                          <div className="text-[12px] text-[#5E6166]">
                            {item._id}
                          </div>
                        </div>
                      </div>

                      <div className="w-[15%] flex gap-2 items-center justify-center">
                        {item.categoryId.map((category, index) => {
                          return (
                            <div key={index}>
                              {category.categoryName}
                              {item.categoryId.length > 1 ? "," : ""}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[10%] flex  items-center justify-center">
                        {item.price}₮
                      </div>
                      <div className="w-[10%]  flex  items-center justify-center">
                        {item.reviewCount}
                      </div>
                      <div className="w-[20%] text-center flex items-center justify-center">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                      <div className="w-[15%]  flex  items-center justify-center gap-3">
                        <MdDeleteForever
                          onClick={() => deleteProduct(item._id)}
                          className="w-5 h-5 hover:text-red-500 cursor-pointer"
                        />
                        <MdModeEdit className="w-5 h-5 cursor-pointer hover:text-green-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`${!page ? "flex" : "hidden"}`}
              onClick={() => setPage(false)}
            >
              <div>
                <div>
                  {allCategories?.map((category, index) => {
                    return (
                      <div key={index}>
                        {index + 1}.{category.categoryName}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <input />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
