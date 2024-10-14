"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt, FaTags } from "react-icons/fa";
import { IoGrid, IoSettingsSharp } from "react-icons/io5";
import { MdContentPaste } from "react-icons/md";

export const AdminBurgerBar = () => {
  const pathname = usePathname(); //

  const isActive = (path: string) =>
    pathname === path ? "bg-black text-white" : "";

  return (
    <div className="flex flex-col gap-4 w-[21%] bg-white pt-6 h-screen">
      <Link href={`/admin/dashboard`}>
        <div
          className={`flex gap-4 items-center px-4 rounded-xl py-2  ${isActive(
            "/admin/dashboard"
          )}`}
        >
          <IoGrid className="text-2xl" />
          <div>Хяналтын самбар</div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/order`}>
        <div
          className={`flex gap-4 items-center px-4 rounded-xl py-2  ${isActive(
            "/admin/dashboard/order"
          )}`}
        >
          <MdContentPaste className="text-2xl" />
          <div>Захиалга</div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/income`}>
        <div
          className={`flex gap-4 items-center px-4 rounded-xl py-2  ${isActive(
            "/admin/dashboard/income"
          )}`}
        >
          <FaTags className="text-2xl" />
          <div>Орлого</div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/product`}>
        <div
          className={`flex gap-4 items-center px-4 rounded-xl py-2  ${isActive(
            "/admin/dashboard/product"
          )}`}
        >
          <FaRegListAlt className="text-2xl" />
          <div>Бүтээгдэхүүн</div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/settings`}>
        <div
          className={`flex gap-4 items-center px-4 rounded-xl py-2  ${isActive(
            "/admin/dashboard/settings"
          )}`}
        >
          <IoSettingsSharp className="text-2xl" />
          <div>Тохиргоо</div>
        </div>
      </Link>
    </div>
  );
};
