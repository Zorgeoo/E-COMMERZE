import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="w-[1280px] py-4 px-6 m-auto flex text-[#FFFFFF] justify-between items-center">
        <div className="flex gap-4">
          <Link href={`/`}>
            <div>
              <Image src={`/Logo.png`} alt="Hello" width={32} height={32} />
            </div>
          </Link>
          <div>ECOMMERCE</div>
          <Link href={`/Category`}>
            <div>Ангилал</div>
          </Link>
        </div>
        <div className="relative">
          <input
            className="pl-8 bg-[#18181B] py-2 px-4 rounded-md outline-none"
            placeholder="Бүтээгдэхүүн хайх"
          />
          <CiSearch className="absolute w-6 h-6 top-2 left-0" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <Link href={`/liked`}>
              <div>
                <CiHeart className="w-6 h-6" />
              </div>
            </Link>
            <Link href={`/buysteps/cart`}>
              <div>
                <CiShoppingCart className="w-6 h-6" />
              </div>
            </Link>
            <Link href={`/userinfo`}>
              <div>
                <CiUser className="w-6 h-6" />
              </div>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href={`/register`}>
              <button className="border border-[#2563EB] rounded-md py-2 px-3">
                Бүртгүүлэх
              </button>
            </Link>
            <Link href={`/login`}>
              <button className="bg-[#2563EB] rounded-md py-2 px-3">
                Нэвтрэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
