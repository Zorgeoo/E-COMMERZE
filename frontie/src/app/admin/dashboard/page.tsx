"use client";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
}

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="bg-[#1C20240A] h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="flex flex-col gap-[50px] w-full  px-6 py-6">
          <div className="flex gap-6 w-full">
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>$</div>
                <div>Орлого</div>
              </div>
              <div className="font-bold text-[32px]">235,000$</div>
              <div className="text-[#5E6166]">Өнөөдөр</div>
            </div>
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>$</div>
                <div>Захиалга</div>
              </div>
              <div className="font-bold text-[32px]">23</div>
              <div className="text-[#5E6166]">Өнөөдөр</div>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex-1 rounded-xl px-6 py-4 bg-white">
              <div className="flex items-center w-full justify-between pb-5">
                <div className="font-semibold text-[18px]">
                  Шилдэг бүтээгдэхүүн
                </div>
                <FaArrowRight />
              </div>
              <div className="flex w-full items-center bg-[#ECEDF0] py-2">
                <div className="w-[10%] text-center">№</div>
                <div className="w-[50%] text-center">Бүтээгдэхүүн</div>
                <div className="w-[20%] text-center">Зарагдсан</div>
                <div className="w-[20%] text-center">Үнэ</div>
              </div>
              <div>
                {allProducts?.slice(0, 6).map((item, index) => {
                  return (
                    <div className="flex py-4 items-center border-b">
                      <div className="w-[10%] text-center">{index + 1}</div>
                      <div className="w-[50%] text-center flex justify-center gap-5">
                        <div className="relative w-10 h-10">
                          <Image
                            alt=""
                            fill
                            src={item.images[0]}
                            className="rounded-full object-cover "
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="font-semibold">
                            {item.productName}
                          </div>
                          <div className="text-[#3F4145]">#12345678</div>
                        </div>
                      </div>
                      <div className="w-[20%] text-center">{index + 100}</div>
                      <div className="w-[20%] text-center">{item.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 rounded-xl px-6 py-4 bg-white">
              <div className="flex items-center w-full justify-between pb-5">
                <div className="font-semibold text-[18px]">Борлуулалт</div>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
