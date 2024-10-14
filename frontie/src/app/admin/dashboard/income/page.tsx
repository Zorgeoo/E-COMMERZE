"use client";
import { apiClient } from "@/components/axios/page";
import { useEffect, useState } from "react";

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
const Income = () => {
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);

  const getOrders = async () => {
    try {
      const res = await apiClient.get(`/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin", dateFilter },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [dateFilter]);

  useEffect(() => {
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
    setTotalIncome(totalIncome);
  }, [orders]);

  return (
    <div className="h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="w-3/5 m-auto">
          <div className="w-full bg-white rounded-lg">
            <div className="flex justify-between p-6 border-b">
              <div className="font-bold text-xl">Орлого</div>
            </div>
            <div className="flex justify-between p-6 font-semibold text-lg">
              {totalIncome?.toLocaleString()}₮
              <div className="flex gap-2">
                <div
                  className={`cursor-pointer border rounded-xl px-2 py-1 ${
                    dateFilter === "today" ? "text-white bg-green-500" : ""
                  }`}
                  onClick={() => setDateFilter("today")}
                >
                  Өнөөдөр
                </div>
                <div
                  className={`cursor-pointer border rounded-xl px-2 py-1 ${
                    dateFilter === "last7days" ? "text-white bg-green-500" : ""
                  }`}
                  onClick={() => setDateFilter("last7days")}
                >
                  7 хоног
                </div>
                <div
                  className={`cursor-pointer border rounded-xl px-2 py-1 ${
                    dateFilter === "lastMonth" ? "text-white bg-green-500" : ""
                  }`}
                  onClick={() => setDateFilter("lastMonth")}
                >
                  Сараар
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg mt-4 overflow-hidden">
            <div className="flex w-full items-center border-b py-[14px] px-3 justify-between">
              <div className="w-[25%] text-center">Захиалгын дугаар</div>
              <div className="w-[25%] text-center">Үйлчлүүлэгч</div>
              <div className="w-[25%] text-center">Огноо</div>
              <div className="w-[25%] text-center">Төлөв</div>
            </div>
            <div className="flex flex-col bg-white">
              {orders.map((order, index) => {
                return (
                  <div
                    className="flex justify-between w-full py-4 items-center px-3 border-b"
                    key={index}
                  >
                    <div className="w-[25%] text-center">
                      #{order._id.slice(0, 6)}
                    </div>
                    <div className="w-[25%] text-center">
                      <div>{order.firstName}</div>
                    </div>
                    <div className="w-[25%] text-center">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                    <div className="w-[25%] text-center">{order.status}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Income;
