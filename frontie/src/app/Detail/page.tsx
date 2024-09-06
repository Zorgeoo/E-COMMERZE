"use client";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
const images = ["/detail1.png", "/detail2.png", "/detail3.png", "/detail4.png"];
export const Detail = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [count, setCount] = useState(0);
  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div className="flex gap-5 pt-[52px] pb-20">
          <div className="flex flex-col gap-2 self-center">
            {images.map((item, index) => {
              return (
                <div key={index} className="relative h-[67px] w-[67px]">
                  <Image
                    alt=""
                    fill
                    src={item}
                    className="object-cover rounded-md"
                    onClick={() => setCurrentImage(item)}
                  />
                </div>
              );
            })}
          </div>
          <div className="relative h-[521px] w-[422px]">
            <Image
              alt=""
              src={currentImage}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="pt-[100px] flex flex-col gap-6">
            <div>
              <div className="flex flex-col gap-2">
                <div className="py-[2px] px-[10px] rounded-full border w-fit font-semibold border-[#2563EB]">
                  ШИНЭ
                </div>
                <div className="flex gap-2">
                  <div>Wildflower Hoodie</div>
                  <div>
                    <CiHeart className="w-6 h-6" />
                  </div>
                </div>
                <div>Зэрлэг цэцгийн зурагтай даавуун материалтай цамц</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="underline">Хэмжээний заавар</div>
                <div className="flex gap-1">
                  <div className="flex justify-center items-center p-2 w-8 h-8 rounded-full bg-black text-white">
                    S
                  </div>
                  <div className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black">
                    M
                  </div>
                  <div className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black">
                    L
                  </div>
                  <div className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black">
                    XL
                  </div>
                  <div className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black">
                    2XL
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                  onClick={handleDecrement}
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
            <div>
              <div className="font-bold text-[20px] pb-2">120,000</div>
              <button className="text-white bg-[#2563EB] py-2 px-9 rounded-full">
                Сагсанд нэмэх
              </button>
            </div>
            <div>
              <div className="flex gap-4">
                <div>Үнэлгээ</div>
                <div>Бүгдийг харах</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                </div>
                <div className="font-bold">4.7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
