"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  firstName: string;
  createdAt: string;
  _id: string;
  status: string;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setfilteredOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);

  const getOrders = async (status: string | undefined) => {
    try {
      const res = await axios.get(`http://localhost:3004/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin", status },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await axios.put(
        `http://localhost:3004/order/update`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            orderId,
            newStatus,
          },
        }
      );
      getOrders(status);
      console.log(res.data.message);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    getOrders(status);
  }, [status]);

  useEffect(() => {
    if (search.length > 0 && orders) {
      const filtered = orders.filter((order) =>
        order.firstName.toLowerCase().startsWith(search.toLowerCase())
      );

      setfilteredOrders(filtered);
    } else {
      setfilteredOrders(orders);
    }
  }, [search, orders]);

  return (
    <div className="bg-[#1C20240A] h-fit">
      <div className="w-[985px] m-auto flex">
        <div className="w-full">
          <div className="flex border-b w-full">
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === undefined ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus(undefined)}
            >
              Бүгд
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Ordered" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Ordered")}
            >
              Ordered
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Shipped" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Shipped")}
            >
              Shipped
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Delivered" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Delivered")}
            >
              Delivered
            </div>
          </div>
          <div className="flex justify-between py-6 px-4">
            <div className="flex gap-2">
              <button className="px-4 py-[10px] border bg-white rounded-[8px]">
                Өнөөдөр
              </button>
              <button className="px-4 py-[10px] border bg-white rounded-[8px]">
                7 хоног
              </button>
              <div className="px-4 py-[10px] border bg-white rounded-[8px]">
                Сараар
              </div>
            </div>
            <div>
              <input
                placeholder="Үйлчлүүлэгчийн нэр"
                className="bg-white rounded-lg px-4 py-[10px] border mr-2"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="border rounded-[12px] overflow-hidden mx-6">
            <div className="text-[20xp] font-semibold px-6 py-5 bg-white">
              Захиалга
            </div>
            <div>
              <div className="flex w-full items-center bg-[#ECEDF0] py-[14px] px-3 justify-between">
                <div className="w-[20%] text-center">Захиалгын дугаар</div>
                <div className="w-[20%] text-center">Үйлчлүүлэгч</div>
                <div className="w-[15%] text-center">Огноо</div>
                <div className="w-[10%] text-center">Төлбөр</div>
                <div className="w-[15%] text-center">Статус</div>
                <div className="w-[15%] text-center">Дэлгэрэнгүй</div>
              </div>
              <div className="flex flex-col">
                {filteredOrders.map((item, index) => {
                  return (
                    <div
                      className="flex justify-between w-full py-4 items-center px-3 border-b"
                      key={index}
                    >
                      <div className="w-[20%] text-center">
                        {item._id.slice(15)}
                      </div>
                      <div className="w-[20%] text-center">
                        <div>{item.firstName}</div>
                      </div>
                      <div className="w-[15%] text-center">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                      <div className="w-[10%] text-center">Төлбөр</div>
                      <div className="w-[15%] text-center">
                        <Select
                          onValueChange={(newStatus) =>
                            handleStatusChange(item._id, newStatus)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={item.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ordered">Ordered</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Link href={`${item._id}`} className="w-[15%]">
                        <div className="w-full flex justify-center">
                          <FaArrowRight />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
