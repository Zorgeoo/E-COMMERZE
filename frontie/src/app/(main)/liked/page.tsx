"use client";
import { useProductContext } from "@/components/utils/context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Liked = () => {
  const { user, getMe } = useProductContext();
  const [heartFill, setHeartFill] = useState(false);

  const handleLikedProducts = async (productId: string) => {
    setHeartFill(!heartFill);
    if (user) {
      try {
        const response = await axios.post(
          "http://localhost:3004/user/liked",
          {
            userId: user.id,
            productId: productId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        getMe();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#F7F7F8]">
      <div className="w-[1280px] m-auto">
        <div className="w-3/5 m-auto px-[80px] py-[70px]">
          <div className="flex gap-1 text-[20px]">
            <div className="pb-4 font-bold">Хадгалсан бараа</div>
            <div>({user?.liked?.length})</div>
          </div>
          <div className="flex flex-col gap-4 ">
            {user?.liked.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-6 bg-white rounded-2xl relative"
                >
                  <div className="relative h-[120px] w-[120px]">
                    <Image
                      alt=""
                      fill
                      src={item.images[0]}
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-around">
                    <div>
                      <div className="">{item.productName}</div>
                    </div>
                    <div className="font-bold">
                      {item.price.toLocaleString()}₮
                    </div>
                    <button className="text-white bg-[#2563EB] w-fit py-2 px-3 rounded-full">
                      Сагслах
                    </button>
                  </div>
                  <FaHeart
                    onClick={() => handleLikedProducts(item._id)}
                    className={`absolute top-4 right-4 w-6 h-6 text-red-700`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Liked;
