import Image from "next/image";
import { Correct } from "../assets/Correct";
const data = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
];
export const address = () => {
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
                <div>(4)</div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-6 border-b pb-6 border-gray-300 border-dashed">
                {data.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-between gap-6">
                      <div className="relative h-20 w-40">
                        <Image
                          alt=""
                          fill
                          src={item.img}
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <div className="pb-1">{item.title}</div>
                        </div>
                        <div>2 x 120’000₮</div>
                        <div className="font-bold">
                          {item.price.toLocaleString()}₮
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Үнийн дүн:</div>
              <div className="font-bold text-[20px]">120’000₮</div>
            </div>
          </div>
          <div className="p-8 bg-gray-100 rounded-xl w-full flex flex-col gap-9 ">
            <div className="font-bold text-[18px]">
              2. Хүргэлтийн мэдээлэл оруулах
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <div>Овог:</div>
                <input id="surname" className="w-full rounded-md px-3 py-1" />
              </div>
              <div>
                <div>Нэр:</div>
                <input id="surname" className="w-full rounded-md px-3 py-1" />
              </div>
              <div>
                <div>Утасны дугаар:</div>
                <input id="surname" className="w-full rounded-md px-3 py-1" />
              </div>
              <div>
                <div>Хаяг:</div>
                <input id="surname" className="w-full rounded-md px-3 py-1" />
              </div>
              <div>
                <div>Нэмэлт мэдээлэл:</div>
                <input id="surname" className="w-full rounded-md px-3 py-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default address;
