"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const data = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
];
export const Cart = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="w-[1280px] m-auto pt-7 pb-[137px]">
        <div className="flex items-center w-fit m-auto">
          <div className="py-1 px-3 text-white bg-black border border-black rounded-full">
            1
          </div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="py-1 px-3 border border-black rounded-full">2</div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="py-1 px-3 border border-black rounded-full">3</div>
        </div>
        <div className="p-8 bg-gray-100 rounded-xl">
          <div className="flex gap-1 pb-6">
            <div>1. Сагс </div>
            <div>(4)</div>
          </div>
          <div className="flex flex-col gap-6">
            {data.map((item, index) => {
              return (
                <div key={index} className="flex justify-between gap-6">
                  <div className="relative h-[120px] w-[120px]">
                    <Image
                      alt=""
                      fill
                      src={item.img}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="pb-1">{item.title}</div>
                      <div className="flex items-center gap-4">
                        <div
                          className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                          onClick={() =>
                            setCount((prev) => (prev > 0 ? prev - 1 : 0))
                          }
                        >
                          -
                        </div>
                        <div>{count}</div>
                        <div
                          className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                          onClick={() => setCount((prev) => prev + 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="font-bold">
                      {item.price.toLocaleString()}₮
                    </div>
                  </div>
                  <div className="p-4 cursor-pointer">
                    <FaRegTrashCan />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex justify-between pt-6">
              <div>Үнийн дүн:</div>
              <div className="font-bold text-[20px]">360,000₮</div>
            </div>
            <Link href={`/address`} className="self-end">
              <button className="px-9 py-2 rounded-full text-white bg-[#2563EB]">
                Худалдан авах
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
