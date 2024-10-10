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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: Category[];
  _id: string;
  createdAt: string;
  reviewCount: number;
  stock:number
}
interface Category {
  categoryName: string;
  _id: string;
}

export default function Home() {
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

  const [categoryName, setCategoryName] = useState<string>("");

  const [updatedName, setUpdatedName] = useState<string>();
  const [updatedPrice, setUpdatedPrice] = useState<number | undefined>(
    undefined
  );
  const [updatedCategory, setUpdatedCategory] = useState<string[]>([]);

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
      await axios.delete("http://localhost:3004/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { productId },
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
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

  const createCategory = async () => {
    try {
      await axios.post(
        "http://localhost:3004/category/",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId: string) => {
    try {
      await axios.put(
        `http://localhost:3004/product/update`,
        { updatedName, updatedPrice, productId, updatedCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
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
                    <Select
                      onValueChange={(category) =>
                        setFilterByCategory(category)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <LuShapes />
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
                  <div className="flex items-center gap-2 font-semibold bg-white rounded-lg ">
                    <Select onValueChange={(value) => setSortByPrice(value)}>
                      <SelectTrigger className="w-[180px]">
                        <FaArrowDown
                          className={`${
                            sortByPrice === "highest" ? "rotate-180" : ""
                          }`}
                        />
                        <SelectValue placeholder="Үнээр" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highest">Өсөхөөр</SelectItem>
                        <SelectItem value="lowest">Буурахаар</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 font-semibold bg-white rounded-lg ">
                    <Select onValueChange={(value) => setSortByDate(value)}>
                      <SelectTrigger className="w-[180px]">
                        <FaRegCalendar />
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
                  <div className="w-[5%] text-center">№</div>
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
                      <div className="w-[5%] flex justify-center items-center">
                        {index + 1}.
                      </div>
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
                        {item.price.toLocaleString()}₮
                      </div>
                      <div className="w-[10%]  flex  items-center justify-center">
                        {item.stock}
                      </div>
                      <div className="w-[20%] text-center flex items-center justify-center">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                      <div
                        className="w-[15%] flex items-center justify-center gap-6
                      "
                      >
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <MdDeleteForever className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Та тус бүтээгдэхүүнийг устгахдаа итгэлтэй байна
                                уу?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your prduct from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Үгүй</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteProduct(item._id)}
                              >
                                Тийм
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Dialog>
                          <DialogTrigger>
                            <MdModeEdit className="w-5 h-5 cursor-pointer hover:text-green-500" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Бүтээгдэхүүний мэдээлэл өөрчлөх
                              </DialogTitle>
                              <DialogDescription>
                                <div>
                                  <div className="flex p-5 justify-between">
                                    <label className="text-black">
                                      Бүтээгдэхүүний нэр өөрчлөх
                                      <input
                                        id="updatedName"
                                        className="pl-2 bg-gray-200 mt-1 rounded-md"
                                        placeholder={item.productName}
                                        value={updatedName}
                                        onChange={(event) =>
                                          setUpdatedName(event?.target.value)
                                        }
                                      />
                                    </label>
                                    <label className="text-black">
                                      Үнэ өөрчлөх
                                      <input
                                        id="updatePrice"
                                        className=" pl-2 bg-gray-200 mt-1 rounded-md"
                                        placeholder={item?.price.toLocaleString()}
                                        value={updatedPrice}
                                        onChange={(event) =>
                                          setUpdatedPrice(
                                            Number(event?.target.value)
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                  <div className="flex p-5 justify-between">
                                    <div>
                                      <div className="text-black">
                                        Ангиллууд
                                      </div>
                                      <div className="flex gap-2 mt-1">
                                        {allCategories.map((category) => {
                                          const isChecked =
                                            updatedCategory.includes(
                                              category._id
                                            );
                                          return (
                                            <label key={category._id}>
                                              <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={(event) => {
                                                  if (event.target.checked) {
                                                    setUpdatedCategory(
                                                      (prev) => [
                                                        ...prev,
                                                        category._id,
                                                      ]
                                                    );
                                                  } else {
                                                    setUpdatedCategory((prev) =>
                                                      prev.filter(
                                                        (catId) =>
                                                          catId !== category._id
                                                      )
                                                    );
                                                  }
                                                }}
                                              />
                                              {category.categoryName}
                                            </label>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <DialogClose>
                                      <button
                                        onClick={() => updateProduct(item._id)}
                                        className="px-3 py-2 cursor-pointer text-black rounded-xl bg-gray-300 hover:text-white hover:bg-black "
                                      >
                                        Өөрчлөлт оруулах
                                      </button>
                                    </DialogClose>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`${
                !page ? "flex" : "hidden"
              } bg-white p-20 w-fit rounded-2xl`}
              onClick={() => setPage(false)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Ангиллууд</div>
                  <div>
                    {allCategories?.map((category, index) => {
                      return (
                        <div key={index}>
                          {index + 1}.{category.categoryName}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label>
                    Ангиллын нэр
                    <input
                      value={categoryName}
                      onChange={(event) => setCategoryName(event?.target.value)}
                      className="px-3 bg-[#F7F7F8] text-[#8B8E95] rounded-lg w-full mt-1"
                      placeholder="Ангиллын нэр оруулах"
                    />
                  </label>
                  <button
                    className="bg-green-500 px-3 py-2 rounded-2xl hover:text-white cursor-pointer"
                    onClick={createCategory}
                  >
                    Ангилал үүсгэх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
