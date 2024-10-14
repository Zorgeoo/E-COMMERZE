"use client";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient } from "@/components/axios/page";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  _id: string;
  soldQty: number;
}

interface ProductOrder {
  quantity: number;
  _id: string;
  productId: Product;
}

interface Order {
  firstName: string;
  createdAt: string;
  _id: string;
  status: string;
  products: ProductOrder[];
}

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState<Product[] | undefined>(
    undefined
  );
  const [sortedProducts, setSortedProducts] = useState<Product[] | undefined>(
    undefined
  );
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [totalSoldQty, setTotalSoldQty] = useState<number | undefined>(
    undefined
  );
  const [orders, setOrders] = useState<Order[]>([]);

  const getProducts = async () => {
    try {
      const response = await apiClient.get("/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("Can not get products");
    }
  };
  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await apiClient.get(`/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin", dateFilter: "today" },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const products = allProducts?.sort((a, b) => b.soldQty - a.soldQty);
    const totalIncome = orders.reduce((total, order) => {
      return (
        total +
        order.products.reduce((orderTotal, productOrder) => {
          const price = productOrder.productId?.price;
          if (price !== undefined) {
            return orderTotal + productOrder.quantity * price;
          }
          return orderTotal;
        }, 0)
      );
    }, 0);
    // const totalSoldQty = orders?.reduce((total, order) => {
    //   return (
    //     total+ order.products.reduce((orderTotal,order)=>{})
    //   )
    // }, 0);
    setTotalIncome(totalIncome);
    setSortedProducts(products);
    setTotalSoldQty(totalSoldQty);
  }, [allProducts]);

  return (
    <div className="h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="flex flex-col gap-[50px] w-full  px-6 py-6">
          <div className="flex gap-6 w-full">
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>₮</div>
                <div>Нийт орлого</div>
              </div>
              <div className="font-bold text-[32px]">
                {totalIncome?.toLocaleString()}₮
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>Нийт борлуулагдсан хэмжээ</div>
              </div>
              <div className="font-bold text-[32px]">{totalSoldQty}</div>
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
                {sortedProducts?.slice(0, 6).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex py-4 items-center border-b"
                    >
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
                          <div className="text-[#3F4145]">
                            #{item._id.slice(0, 6)}
                          </div>
                        </div>
                      </div>
                      <div className="w-[20%] text-center">{item.soldQty}</div>
                      <div className="w-[20%] text-center">
                        {item.price.toLocaleString()}₮
                      </div>
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
