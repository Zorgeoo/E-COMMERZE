"use client";
import { useProductContext } from "@/components/utils/context";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const data = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
];

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  sizes: string[];
  _id: string;
}
interface OrderProduct {
  productId: Product;
  quantity: number;
  size: string;
  _id: string;
}

interface Order {
  products: OrderProduct[];
  status: string;
  createdAt: string;
}

export const Userinfo = () => {
  const [page, setPage] = useState(true);
  const [hideOrder, setHideOrder] = useState<boolean[]>([]);
  const { user } = useProductContext();
  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3004/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: user?.id },
      });
      setOrders(res.data.orders);
      setHideOrder(new Array(res.data.orders.length).fill(true));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const toggleOrder = (index: number) => {
    setHideOrder((prev) => {
      const newHideOrder = [...prev];
      newHideOrder[index] = !newHideOrder[index];
      return newHideOrder;
    });
  };
  console.log(orders);

  return (
    <div className="bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto">
        <div className="flex py-[100px] justify-center gap-5">
          <div className="w-[20%] ">
            <div
              className={`rounded-2xl w-full py-2 px-4 ${
                page ? "bg-white" : ""
              }`}
              onClick={() => setPage(true)}
            >
              Хэрэглэгчийн хэсэг
            </div>
            <div
              className={`rounded-2xl w-full py-2 px-4 ${
                !page ? "bg-white" : ""
              }`}
              onClick={() => setPage(false)}
            >
              Захиалгын түүх
            </div>
          </div>
          <div
            className={`flex flex-col gap-8  w-[50%] ${
              page ? "" : "hidden"
            } py-2`}
          >
            <div className="font-medium border-b pb-5">Хэрэглэгчийн хэсэг</div>
            <div className="flex flex-col gap-8">
              <div>
                <div>Овог:</div>
                <input
                  id="lastname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Нэр:</div>
                <input
                  placeholder={user?.username}
                  id="firstname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Утасны дугаар:</div>
                <input
                  id="phonenumber"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Имэйл:</div>
                <input
                  id="email"
                  className="w-full rounded-md px-3 py-1 border"
                  placeholder={user?.email}
                />
              </div>
              <div>
                <div>Хаяг:</div>
                <input
                  id="address"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
            </div>
            <button className="py-2 px-9 bg-[#2563EB] text-white rounded-full self-end">
              Мэдээлэл шинэчлэх
            </button>
          </div>
          <div className={`${!page ? "" : "hidden"} w-1/2 py-2`}>
            <div className="pb-6 font-medium border-b">Захиалгын түүх</div>
            <div className={`py-2 bg-[#F4F4F5E5] rounded-2xl`}>
              <div className={`py-8 flex flex-col gap-4 `}>
                <div className={`flex flex-col gap-6 pb-6`}>
                  <div
                    className={`flex flex-col gap-4 bg-[#F4F4F5E5] rounded-2xl`}
                  >
                    {orders.length === 0 ? (
                      <div>Захиалга байхгүй</div>
                    ) : (
                      orders.map((order, orderIndex) => (
                        <div
                          key={orderIndex}
                          className="py-8 px-6 bg-white rounded-xl"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <div className="font-bold">
                                {new Date(order.createdAt).toLocaleString()}
                              </div>
                              <div className="text-white bg-[#2563EB] text-sm rounded-full py-[2px] px-[10px]">
                                {order.status}
                              </div>
                            </div>
                            <div onClick={() => toggleOrder(orderIndex)}>
                              {hideOrder[orderIndex] ? "▼" : "▲"}
                            </div>
                          </div>
                          <div
                            className={`py-4 flex flex-col gap-4 ${
                              hideOrder[orderIndex] ? "hidden" : ""
                            }  border-gray-300 border-dashed border-b`}
                          >
                            {order.products.map(
                              (item: any, itemIndex: number) => (
                                <div
                                  key={itemIndex}
                                  className="flex gap-2 items-center w-full  "
                                >
                                  <div className="relative w-9 h-11">
                                    <Image
                                      src={item?.productId?.images[0]}
                                      alt="das"
                                      fill
                                      className="rounded-xl"
                                    />
                                  </div>
                                  <div className="flex justify-between w-full items-center ">
                                    <div className="flex flex-col ">
                                      <div className="pb-1">
                                        {item?.productId?.productName}
                                      </div>
                                      <div>
                                        {item.quantity} x{" "}
                                        {item?.productId?.price.toLocaleString()}
                                        ₮
                                      </div>
                                    </div>
                                    <div className=" font-bold">
                                      {(
                                        item.quantity * item?.productId?.price
                                      ).toLocaleString()}
                                      ₮
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          <div className={`flex justify-between pt-4`}>
                            <div>Үнийн дүн:</div>
                            <div className="font-bold">
                              {order.products
                                .reduce(
                                  (total: number, item: any) =>
                                    total +
                                    item?.productId?.price * item.quantity,
                                  0
                                )
                                .toLocaleString()}
                              ₮
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Userinfo;
