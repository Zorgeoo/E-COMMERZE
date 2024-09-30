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

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
}
export default function home() {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    <div className="bg-[#1C20240A] h-screen p-4">
      <div className="w-[985px] m-auto flex gap-4">
        <div className="flex w-full">
          <div className="flex flex-col w-full gap-6">
            <div className="flex border-b">
              <div className="px-4 text-sm font-semibold border-b-2 border-black  py-4">
                Бүтээгдэхүүн
              </div>
              <div className="px-4 text-sm text-[#3F4145] py-4">Ангилал</div>
            </div>
            <Link href={`/admin/dashboard/product/addproduct`}>
              <div className="text-white flex gap-2 bg-black px-12 py-2 items-center rounded-xl w-fit font-semibold">
                <div>+</div>
                <div>Бүтээгдэхүүн нэмэх</div>
              </div>
            </Link>
            <div className="flex justify-between h-10 pr-9">
              <div className="flex  gap-3  ">
                <div className="flex items-center gap-2 font-semibold px-3 bg-white rounded-lg ">
                  <div>
                    <LuShapes />
                  </div>
                  <div className="text-[#3F4145]">Ангилал</div>
                  <div>
                    <FaArrowDown />
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold px-3 bg-white rounded-lg ">
                  <div>$</div>
                  <div className="text-[#3F4145]">Үнэ</div>
                  <div>
                    <FaArrowDown />
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold px-3 bg-white rounded-lg ">
                  <div>
                    <FaRegCalendar />
                  </div>
                  <div className="text-[#3F4145]">Сараар</div>
                  <div>
                    <FaArrowDown />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
                <div>
                  <IoSearchSharp />
                </div>
                <input
                  className="outline-none w-[360px]"
                  placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
                ></input>
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-[12px]">
              <div className="flex w-full h-11 items-center border">
                <div className=" flex-1 pl-[140px] ">Бүтээгдэхүүн</div>
                <div className=" flex-1 flex justify-center">Ангилал</div>
                <div className=" flex-1 flex justify-center">Үнэ</div>
                <div className=" flex-1 ">Үлдэгдэл</div>
                <div className=" flex-1 ">Зарагдсан</div>
                <div className=" flex-1 pr-[100px] "> Нэмсэн огноо</div>
              </div>
              {allProducts?.map((item, index) => {
                return (
                  <div key={index} className="flex border-t h-[72px] text-sm">
                    <div className="flex-[2] flex  items-center  gap-[80px] justify-center">
                      <div className="border flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-black border"
                        ></input>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image src={item.images[0]} fill alt="aa" />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-semibold text-sm">
                            {item.productName}
                          </div>
                          <div className="text-[12px] text-[#5E6166]">
                            {/* {item.id} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1  flex items-center justify-end">
                      {/* {item.angilal} */}
                    </div>
                    <div className="flex-1  flex items-center justify-center">
                      {item.price}₮
                    </div>
                    <div className="flex-1  flex items-center justify-center">
                      {/* {item.uldegdel} */}
                    </div>
                    <div className="flex-1  flex items-center justify-center">
                      {/* {item.zaragdsan} */}
                    </div>
                    <div className="flex-1  flex items-center justify-center">
                      {/* {item.date} */}
                    </div>
                    <div className="flex-1  flex items-center justify-center gap-3">
                      <MdDeleteForever />
                      <MdModeEdit />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
