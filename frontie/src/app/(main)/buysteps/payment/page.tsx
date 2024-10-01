import Link from "next/link";
import { Correct } from "@/app/assets/Correct";

export const Payment = () => {
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div>
          <div className="flex items-center w-fit m-auto pt-7 pb-[66px]">
            <div className="py-2 px-2 text-white bg-black border border-black rounded-full">
              <Correct />
            </div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-2 px-2 text-white bg-black border border-black rounded-full">
              <Correct />
            </div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-1 px-3 border border-black bg-black text-white rounded-full">
              3
            </div>
          </div>
        </div>
        <div className="p-8 bg-[#F4F4F5E5] rounded-2xl w-fit flex flex-col gap-4 m-auto">
          <div>3. Төлбөр төлөлт</div>
          <div>
            <div className="rounded-full bg-white w-fit py-1 px-2">14:59</div>
            <div className="relative">{/* <Image src= alt="" fill /> */}</div>
          </div>
          <Link href={`/buysteps/success`}>
            <button className="py-2 px-9 bg-white rounded-full">Буцах</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Payment;
