import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const AdminLogin = () => {
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div className="border w-fit absolute">
          <div className="w-[194px] h-8 relative">
            <Image alt="" src={`/Group.png`} fill />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-2/6 items-center m-auto p-10 border rounded-lg">
          <div className="font-bold text-[32px]">Нэвтрэх</div>
          <div className="flex flex-col gap-4 w-full border-b pb-4">
            <div>
              <div>Имэйл</div>
              <input
                className="border bg-[#F7F7F8] rounded-lg p-2 w-full"
                placeholder="Имэйл"
              />
            </div>
            <div className="">
              <div>Нууц үг</div>
              <input
                className="border bg-[#F7F7F8] rounded-lg p-2 w-full"
                placeholder="Нууц үг"
              />
            </div>
            <button className="bg-black text-white flex rounded-lg">
              <div className="w-full flex items-center justify-center relative p-2">
                <div>Дараах</div>
                <FaArrowRight className="absolute right-2" />
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-3 pb-4 w-full border-b">
            <div className="flex gap-[2px] items-center bg-[#1C20240A] rounded-lg p-2 justify-center">
              <div className="relative w-6 h-6">
                <Image alt="" src={`/_CompanyLogo.png`} fill />
              </div>
              <div>Google-ээр нэвтрэх</div>
            </div>
            <div className="flex gap-[2px] items-center bg-[#1C20240A] rounded-lg p-2 justify-center">
              <div className="relative w-6 h-6">
                <Image alt="" src={`/microsoft.png`} fill />
              </div>
              <div>Microsoft-оор нэвтрэх</div>
            </div>
            <div className="flex gap-[2px] items-center bg-[#1C20240A] rounded-lg p-2 justify-center">
              <div className="relative w-6 h-6">
                <Image alt="" src={`/apple.png`} fill />
              </div>
              <div>Apple-аар нэвтрэх</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-[#525252]">Бүртгэлтэй юу?</div>
            <div className="underline">Нэвтрэх</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
