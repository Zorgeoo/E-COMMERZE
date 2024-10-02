"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductContext } from "@/components/utils/context";
import axios from "axios";
import { DeliveryCard } from "@/components/co-components/DeliveryCard";

export const Cart = () => {
  const { user } = useProductContext();
  const [carts, setCarts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [newQty, setNewQty] = useState<number>(0);

  const getCarts = async (userId: string) => {
    try {
      const res = await axios.get(`http://localhost:3004/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      });
      setCarts(res.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (cartId: string) => {
    try {
      const res = await axios.delete(`http://localhost:3004/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { cartId },
      });
      setCarts((prevCarts) => prevCarts.filter((item) => item._id !== cartId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCarts(user.id);
    }
  }, [user]);

  useEffect(() => {
    const totalPrice = carts.reduce((acc, item) => {
      return acc + item.cartProducts.price * item.quantity;
    }, 0);
    console.log("dasa");

    setTotalPrice(totalPrice);
  }, [carts]);
  console.log(newQty);

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
            <div>({carts.length})</div>
          </div>
          <div className="flex flex-col gap-6">
            {carts.map((item, index) => {
              return (
                <DeliveryCard
                  key={index}
                  item={item.cartProducts}
                  qty={item.quantity}
                  deleteCart={() => deleteCart(item._id)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex justify-between pt-6">
              <div>Үнийн дүн:</div>
              <div className="font-bold text-[20px]">
                {totalPrice.toLocaleString()}₮
              </div>
            </div>
            <Link
              href={`${carts.length > 0 ? "/buysteps/address" : ""}`}
              className="self-end"
            >
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
