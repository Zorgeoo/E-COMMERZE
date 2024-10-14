"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useProductContext } from "../utils/context";
import { apiClient } from "../axios/page";

interface MyComponentProps {
  img: string;
  title: string;
  price: number;
  customHeight: string;
  id: string;
}
export const ProductCard: React.FC<MyComponentProps> = ({
  img,
  title,
  price,
  customHeight,
  id,
}) => {
  const [heartFill, setHeartFill] = useState(false);
  const { user, getMe } = useProductContext();

  const handleLikedProducts = async () => {
    setHeartFill(!heartFill);
    if (user) {
      try {
        const response = await apiClient.post(
          "/user/liked",
          {
            userId: user.id,
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.message);
        getMe();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    try {
      if (user && user.liked) {
        const isLiked = user.liked.some((item) => item._id.toString() === id);
        setHeartFill(isLiked);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, id]);

  return (
    <div className="rounded-xl overflow-hidden flex flex-col gap-2 h-fit">
      <div
        className={`relative rounded-xl w-full overflow-hidden`}
        style={{ height: customHeight }}
      >
        <Link href={`${id}`}>
          <Image
            className="object-cover rounded-xl hover:scale-150 duration-1000"
            src={img}
            fill
            quality={100}
            alt="henlo"
          />
        </Link>
        <FaHeart
          onClick={handleLikedProducts}
          className={`absolute right-4 cursor-pointer top-4 w-6 h-6 ${
            heartFill ? "text-red-700" : ""
          }`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div>{title}</div>
        <div className="font-bold">{price.toLocaleString()}₮</div>
      </div>
    </div>
  );
};
