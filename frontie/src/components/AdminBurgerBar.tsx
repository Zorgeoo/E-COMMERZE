"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegListAlt, FaTags } from "react-icons/fa";
import { IoGrid, IoSettingsSharp } from "react-icons/io5";
import { MdContentPaste } from "react-icons/md";

export const AdminBurgerBar = () => {
  const router = useRouter();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className="flex flex-col gap-4  w-[21%] bg-white pt-6">
      <Link href={`/admin/dashboard`}>
        <div
          className={`flex gap-4 items-center px-4 ${
            currentPath === "/admin/dashboard" ? "bg-[#EDEDED]" : ""
          }`}
        >
          <IoGrid className="text-2xl" />
          <div>Хяналтын самбар</div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/order`}>
        <div className="flex gap-4 items-center px-4">
          <MdContentPaste className="text-2xl" />
          <div>Захиалга</div>
        </div>
      </Link>
      <div className="flex gap-4 items-center px-4">
        <FaTags className="text-2xl" />
        <div>Орлого</div>
      </div>
      <div className="flex gap-4 items-center px-4">
        <FaRegListAlt className="text-2xl" />
        <div>Бүтээгдэхүүн</div>
      </div>
      <div className="flex gap-4 items-center px-4">
        <IoSettingsSharp className="text-2xl" />
        <div>Тохиргоо</div>
      </div>
    </div>
  );
};
