"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductContext } from "@/components/utils/context";
import { DeliveryCard } from "@/components/co-components/DeliveryCard";
import { apiClient } from "@/components/axios/page";

type Cart = {
  quantity: number;
  size: string;
  _id: string;
  cartProducts: {
    _id: string;
    price: number;
    productName: string;
    images: string[];
  };
};

const Cart = () => {
  const { user } = useProductContext();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getCarts = async (userId: string) => {
    try {
      const res = await apiClient.get(`/cart`, {
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

  const updateCart = async (cartId: string, qty: number) => {
    try {
      await apiClient.put(
        `/cart/update`,
        { cartId, qty },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = (cartId: string, qty: number) => {
    const newQty = qty + 1;
    updateCart(cartId, newQty);

    setCarts((prevCarts) =>
      prevCarts.map((item) =>
        item._id === cartId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const decreaseQty = (cartId: string, qty: number) => {
    if (qty > 0) {
      const newQty = qty - 1;
      updateCart(cartId, newQty);

      setCarts((prevCarts) =>
        prevCarts.map((item) =>
          item._id === cartId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const deleteCart = async (cartId: string) => {
    try {
      await apiClient.delete(`/cart`, {
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
    setTotalPrice(totalPrice);
  }, [carts]);

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
                  increaseQty={() => increaseQty(item._id, item.quantity)}
                  decreaseQty={() => decreaseQty(item._id, item.quantity)}
                  deleteCart={() => deleteCart(item._id)}
                  size={item.size}
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
