"use client";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Review } from "./Review";
const images = ["/detail1.png", "/detail2.png", "/detail3.png", "/detail4.png"];
const sizeData = ["S", "M", "L", "XL", "2XL"];
export const DetailedProduct = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [heartFill, setHeartFill] = useState(false);
  const [hiddenElement, setHiddenElement] = useState(false);
  const [count, setCount] = useState(0);
  const [sizeChange, setSizeChange] = useState(6);
  const [rating, setRating] = useState(0);
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div className="flex gap-5 pt-[52px] pb-20">
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 pt-16">
              {images.map((item, index) => {
                return (
                  <div key={index} className="relative h-[67px] w-[67px]">
                    <Image
                      alt=""
                      fill
                      src={item}
                      className={`object-cover rounded-md ${
                        currentImage === item ? "border border-[#09090B]" : ""
                      }`}
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
                    <FaHeart
                      onClick={() => setHeartFill(!heartFill)}
                      className={`cursor-pointer top-4 w-6 h-6 ${
                        heartFill ? "text-red-700" : ""
                      }`}
                    />
                  </div>
                </div>
                <div>Зэрлэг цэцгийн зурагтай даавуун материалтай цамц</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="underline">Хэмжээний заавар</div>
                <div className="flex gap-1">
                  {sizeData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black text-black hover:bg-[#E4E4E7] ${
                          sizeChange === index
                            ? "bg-black text-white hover:bg-black"
                            : "bg-white"
                        }`}
                        onClick={() => setSizeChange(index)}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                  onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
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
                <div
                  onClick={() => {
                    setHiddenElement(!hiddenElement);
                  }}
                >
                  {hiddenElement ? "Бүгдийг хураах" : "Бүгдийг харах"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="" />
                  <FaStar className="" />
                </div>
                <div className="font-bold">4.7</div>
              </div>
            </div>
            <div className={`${hiddenElement ? "block" : "hidden"}`}>
              <div className="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">
                <div>
                  <div>Одоор үнэлэх:</div>
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((item, index) => {
                        return (
                          <FaStar
                            onClick={() => setRating(index + 1)}
                            className={`${
                              index + 1 <= rating ? "text-yellow-500" : ""
                            }`}
                            key={index}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="flex gap-6 flex-col">
                  <div>Сэтгэгдэл үлдээх:</div>
                  <div className="w-full">
                    <input
                      className="border w-full h-[94px] rounded-lg"
                      placeholder="Энд бичнэ үү"
                    />
                  </div>
                  <button className="bg-[#2563EB] w-fit text-white py-2 px-9 rounded-full">
                    Үнэлэх
                  </button>
                </div>
              </div>
              {Array(3)
                .fill(null)
                .map((_, index) => {
                  return <Review key={index} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
