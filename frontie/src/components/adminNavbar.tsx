import Image from "next/image";
import Link from "next/link";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";

export const AdminNavbar = () => {
  return (
    <div className="bg-black">
      <div className="w-[1280px] py-4 px-6 m-auto flex text-[#FFFFFF] justify-between items-center">
        <div className="flex gap-4">
          <Link href={`/`}>
            <div>
              <Image src={`/Logo.png`} alt="Hello" width={32} height={32} />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
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
            <div>Username</div>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </div>
    </div>
  );
};
