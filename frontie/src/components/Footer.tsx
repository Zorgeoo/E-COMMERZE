import Image from "next/image";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-black">
      <div className="w-[1280px] m-auto">
        <div className="flex justify-between py-16">
          <div className="relative w-[41px] h-[35px]">
            <Image src={`/Logo.png`} alt="" fill />
          </div>
          <div className="text-white flex justify-between gap-9 items-center">
            <div className="flex gap-5 items-center">
              <div className="border rounded-full p-[14px]">
                <BsTelephone className=" w-6 h-6" />
              </div>
              <div>(976) 7007-1234</div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="border rounded-full p-[14px]">
                <CiMail className="w-6 h-6" />
              </div>
              <div>contact@ecommerce.mn</div>
            </div>
          </div>
        </div>
        <hr className="border border-gray-500"></hr>
        <div className="text-white flex justify-between py-16">
          <div>© 2024 Ecommerce MN</div>
          <div className="flex gap-5">
            <div>
              <FaFacebook className="w-5 h-5" />
            </div>
            <div>
              <FaInstagram className="w-5 h-5" />
            </div>
            <div>
              <FaXTwitter className="w-5 h-5" />
            </div>
            <div>
              <FaLinkedin className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
