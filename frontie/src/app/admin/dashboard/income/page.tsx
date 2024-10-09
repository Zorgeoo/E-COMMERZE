"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  _id: string;
  soldQty: number;
}

interface Order {
  firstName: string;
  createdAt: string;
  _id: string;
  status: string;
}
const income = () => {
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[] | undefined>(
    undefined
  );
  const [orders, setOrders] = useState<Order[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const getOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3004/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin" },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  useEffect(() => {
    const totalIncome = allProducts?.reduce((total, product) => {
      return total + product.soldQty * product.price;
    }, 0);
    setTotalIncome(totalIncome);
  }, [allProducts]);

  return (
    <div className="bg-[#1C20240A] h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="w-3/5 m-auto">
          <div className="w-full bg-white rounded-lg">
            <div className="flex justify-between p-6 border-b">
              <div className="font-bold text-xl">Орлого</div>
            </div>
            <div className="flex justify-between p-6 font-semibold text-xl">
              {totalIncome?.toLocaleString()}₮
              <div className="font-bold text-3xl"></div>
              <div className="flex gap-2">
                <div>Өнөөдөр</div>
                <div>7 хоног</div>
                <div>Сараар</div>
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
export default income;
