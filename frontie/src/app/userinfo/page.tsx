"use client";
import Image from "next/image";
import { useState } from "react";

const data = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
];
export const Userinfo = () => {
  const [page, setPage] = useState(true);
  const [hideOrder, setHideOrder] = useState(true);
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div className="flex py-[100px] justify-center gap-5">
          <div className="w-[20%] ">
            <div
              className={`rounded-2xl w-full py-2 px-4 ${
                page ? "bg-[#F4F4F5]" : ""
              }`}
              onClick={() => setPage(true)}
            >
              Хэрэглэгчийн хэсэг
            </div>
            <div
              className={`rounded-2xl w-full py-2 px-4 ${
                !page ? "bg-[#F4F4F5]" : ""
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
            <div className="font-medium">Хэрэглэгчийн хэсэг</div>
            <div className="flex flex-col gap-8">
              <div>
                <div>Овог:</div>
                <input
                  id="surname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Нэр:</div>
                <input
                  id="surname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Утасны дугаар:</div>
                <input
                  id="surname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Имэйл:</div>
                <input
                  id="surname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
              <div>
                <div>Хаяг:</div>
                <input
                  id="surname"
                  className="w-full rounded-md px-3 py-1 border"
                />
              </div>
            </div>
            <button className="py-2 px-9 bg-[#2563EB] text-white rounded-full self-end">
              Мэдээлэл шинэчлэх
            </button>
          </div>
          <div className={`${!page ? "" : "hidden"} w-1/2 py-2`}>
            <div className="pb-6 border-b font-medium">Захиалгын түүх</div>
            <div className={`mt-6 py-6 px-6 bg-[#F4F4F5E5] rounded-2xl`}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="font-bold">2024-09-03</div>
                  <div className="font-bold">15:24</div>
                  <div className=" text-white bg-[#2563EB] rounded-full py-[2px] px-[10px]">
                    хүргэлтэнд гарсан
                  </div>
                </div>
                <div onClick={() => setHideOrder(!hideOrder)}>^</div>
              </div>
              <div className={`py-8 flex flex-col gap-4 `}>
                <div
                  className={`flex flex-col gap-6 border-b pb-6 border-gray-300 border-dashed ${
                    hideOrder ? "" : "hidden"
                  } `}
                >
                  {data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between gap-6 items-center"
                      >
                        <div className="relative h-20 w-40">
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
                          </div>
                          <div>2 x 120’000₮</div>
                        </div>
                        <div className="font-bold">
                          {item.price.toLocaleString()}₮
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between border">
                  <div>Үнийн дүн:</div>
                  <div className="font-bold">120’000₮</div>
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
