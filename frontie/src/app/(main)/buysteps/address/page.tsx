"use client";
import { Correct } from "@/app/assets/Correct";
import { useProductContext } from "@/components/utils/context";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Cart={
quantity:number,
size:string
cartProducts:{
  _id:string,
  price:number,
  productName:string,
  images:string[]
}
}
const Address = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const { user, getMe } = useProductContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addInfo, setAddInfo] = useState<string>("");
  const router = useRouter();

  const createOrder = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3004/order`,
        {
          userId: user?.id,
          products: carts.map((item) => ({
            productId: item.cartProducts._id,
            quantity: item.quantity,
            size: item.size,
          })),
          lastName,
          firstName,
          phoneNumber,
          address,
          addInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const clearCartResponse = await axios.delete(
        `http://localhost:3004/cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { userId: user?.id },
        }
      );
      console.log(clearCartResponse.data);
      if (carts.length === 0) {
        return;
      } else {
        router.push("payment");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCarts = async (userId: string) => {
    try {
      const res = await axios.get(`http://localhost:3004/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      });
      setCarts(res.data.carts);
      console.log(res.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCarts(user.id);
    }
    getMe();
  }, []);

  useEffect(() => {
    const totalPrice = carts.reduce((acc, item) => {
      return acc + item.cartProducts.price * item.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [carts]);
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div>
          <div className="flex items-center w-fit m-auto pt-7">
            <div className="py-2 px-2 text-white bg-black border border-black rounded-full">
              <Correct />
            </div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-1 px-3 border border-black rounded-full">2</div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-1 px-3 border border-black rounded-full">3</div>
          </div>
        </div>
        <div className="flex py-[50px] gap-5">
          <div className="flex flex-col gap-4 bg-gray-100 rounded-xl px-6 py-8 w-fit">
            <div>
              <div className="flex gap-1 pb-6">
                <div>Сагс </div>
                <div>({carts.length})</div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-6 border-b pb-6 border-gray-300 border-dashed">
                {carts.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-between gap-6">
                      <div className="relative h-20 w-40">
                        <Image
                          alt=""
                          fill
                          src={item.cartProducts.images[0]}
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <div className="pb-1">
                            {item.cartProducts.productName}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div>{item.quantity}</div>
                          <div>x</div>
                          <div>{item.cartProducts.price.toLocaleString()}₮</div>
                        </div>
                        <div className="font-bold">
                          {(
                            item.cartProducts.price * item.quantity
                          ).toLocaleString()}
                          ₮
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Үнийн дүн:</div>
              <div className="font-bold text-[20px]">
                {totalPrice.toLocaleString()}₮
              </div>
            </div>
          </div>
          <div className="p-8 bg-gray-100 rounded-xl w-full flex flex-col gap-9 ">
            <div className="font-bold text-[18px]">
              2. Хүргэлтийн мэдээлэл оруулах
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <div>Овог:</div>
                <input
                  id="lastname"
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                  className="w-full rounded-md px-3 py-1"
                />
              </div>
              <div>
                <div>Нэр:</div>
                <input
                  id="firstname"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-md px-3 py-1"
                />
              </div>
              <div>
                <div>Утасны дугаар:</div>
                <input
                  id="phonenumber"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                  className="w-full rounded-md px-3 py-1"
                />
              </div>
              <div>
                <div>Хаяг:</div>
                <input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full rounded-md px-3 py-1"
                />
              </div>
              <div>
                <div>Нэмэлт мэдээлэл:</div>
                <input
                  id="addInfo"
                  value={addInfo}
                  onChange={(event) => setAddInfo(event.target.value)}
                  className="w-full rounded-md px-3 py-1"
                />
                <div className="text-[12px]">
                  Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                </div>
              </div>
              <div className="flex justify-between">
                <button className="py-2 px-9 rounded-full border bg-white">
                  Буцах
                </button>
                {/* <Link href={`/buysteps/payment`}> */}
                <button
                  className="py-2 px-9 rounded-full bg-[#2563EB] text-white"
                  onClick={createOrder}
                >
                  Төлбөр төлөх
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Address;
