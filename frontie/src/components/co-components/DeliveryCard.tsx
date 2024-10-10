"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface AddressCardProps {
  item: {
    images: string[];
    productName: string;
    price: number;
  };
  qty: number;
  deleteCart: () => void;
  increaseQty: () => void;
  decreaseQty: () => void;
}

export const DeliveryCard: React.FC<AddressCardProps> = ({
  item,
  qty,
  deleteCart,
  increaseQty,
  decreaseQty,
}) => {
  return (
    <div className="flex justify-between gap-6">
      <div className="relative h-[120px] w-[120px]">
        <Image
          alt=""
          fill
          src={item.images[0]}
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="pb-1">{item.productName}</div>
          <div className="flex items-center gap-4">
            <div
              onClick={decreaseQty}
              className="cursor-pointer flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
            >
              -
            </div>
            <div>{qty}</div>
            <div
              onClick={increaseQty}
              className="cursor-pointer flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
            >
              +
            </div>
          </div>
        </div>
        <div className="font-bold">{(qty * item.price).toLocaleString()}₮</div>
      </div>
      <div className="p-4 cursor-pointer">
        <FaRegTrashCan onClick={deleteCart} />
      </div>
    </div>
  );
};
