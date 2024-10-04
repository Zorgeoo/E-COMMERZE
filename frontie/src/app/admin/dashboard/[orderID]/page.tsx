"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Order {
  firstName: string;
  createdAt: string;
  _id: string;
  status: string;
  phoneNumber: string;
  address: string;
  products: Products[];
}

interface ProductId {
  _id: string;
  images: string[];
  price: number;
  productName: string;
}

interface Products {
  productId: ProductId;
  size: string[];
  _id: string;
  quantity: number;
}

type ParamsType = {
  orderID: string;
};
export default function home() {
  const [order, setOrder] = useState<Order>();
  const { orderID } = useParams<ParamsType>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const getOneOrder = async (orderID: string) => {
    //ID-raa back ruu get req yvulaad state-d hadgalna
    try {
      const response = await axios.get(
        `http://localhost:3004/order/${orderID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(response.data.order);
      console.log(response.data.order);
    } catch (error) {
      console.log("Order avj chdsanguie");
    }
  };

  useEffect(() => {
    getOneOrder(orderID);
  }, [orderID]);

  useEffect(() => {
    if (order?.products) {
      const total = order.products.reduce((acc, item) => {
        return acc + item.quantity * item?.productId?.price;
      }, 0);
      setTotalAmount(total);
    }
  }, [order]);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex gap-4 items-center p-4 bg-white">
        <div className="">{/* <LeftDirectionArrow /> */}</div>
        <div>Захиалгын дэлгэрэнгүй</div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 w-[624px] bg-white rounded-lg min-h-[82vh] p-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-[#3F4145]">Захиалгын ID дугаар:</div>
              <div className="font-semibold">{order?._id}</div>
            </div>
            <div className="flex gap-2 bg-[#ECEDF0] rounded-xl items-center justify-center py-1 px-2 h-fit">
              <div className="text-[#3F4145]">{order?.status}</div>
              <div>{/* <DooshooSum /> */}</div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[#3F4145]">Захиалагч: Хувь хүн </div>
            <div className="flex gap-4">
              <div className="font-semibold">{order?.firstName}</div>
              <div className="text-[#3F4145]">{order?.phoneNumber}</div>
            </div>
          </div>
          {order?.products.map((item, index) => {
            return (
              <div
                key={index}
                className="flex rounded-lg overflow-hidden bg-[#F7F7F8]"
              >
                <div className="w-[160px]  relative">
                  <Image
                    fill
                    src={item?.productId?.images[0]}
                    alt="aa"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col py-4 px-6 gap-3">
                  <div className="flex flex-col">
                    <div className="font-bold text-2xl">
                      {item?.productId?.productName}
                    </div>
                    <div className="text-[#3F4145] text-[14px]">
                      Бүтээгдэхүүний ID: {item?.productId?._id}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <div>Тоо ширхэг: {item.quantity}</div>
                      <div className="text-[#3F4145]">
                        x {item?.productId?.price.toLocaleString()}₮
                      </div>
                    </div>
                    <div className="font-semibold text-lg">
                      ₮
                      {(
                        item.quantity * item?.productId?.price
                      ).toLocaleString()}
                      ₮
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-6  flex-1">
          <div className="flex flex-col bg-white  rounded-lg ">
            <div className="py-5 px-6">Хүргэлтийн мэдээлэл</div>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <div className="flex flex-col py-5 px-6 ">
              <div className="pb-5 font-semibold">{order?.address}</div>
            </div>
          </div>
          <div className="flex flex-col bg-white  rounded-lg">
            <div className="py-5 px-6">Төлбөрийн мэдээлэл</div>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <div className="flex flex-col p-6">
              <div>Бүтээгдэхүүн</div>
              <div className="flex flex-col gap-4">
                {order?.products.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-[120px] overflow-hidden text-sm font-semibold text-[#3F4145]">
                          {item?.productId?.productName}
                        </div>
                        <div className=" font-semibold text-[#3F4145] w-fit">
                          x {item.quantity}
                        </div>
                        <div className=" font-semibold text-[#3F4145] w-fit">
                          {item?.productId?.price.toLocaleString()} ₮
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between py-5"></div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="flex justify-between text-lg font-semibold py-5">
                <div>Нийт төлсөн дүн</div>
                <div>{totalAmount?.toLocaleString()}₮</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
