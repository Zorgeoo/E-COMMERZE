import { AdminBurgerBar } from "@/components/AdminBurgerBar";
import { FiDownload } from "react-icons/fi";

const productData = [
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    payment: 12000,
  },
];
const income = () => {
  return (
    <div className="bg-[#1C20240A]">
      <div className="w-[1280px] m-auto flex">
        <AdminBurgerBar />
        <div className="w-3/5 m-auto">
          <div className="w-full bg-white rounded-lg">
            <div className="flex justify-between p-6 border-b">
              <div className="font-bold text-xl">Орлого</div>
              <div className="flex items-center gap-1 px-3 py-2 bg-[#1C20240A] rounded-lg">
                <FiDownload />
                <div>Хуулга татах</div>
              </div>
            </div>
            <div className="flex justify-between p-6 ">
              <div className="font-bold text-3xl">235,000</div>
              <div className="flex gap-2">
                <div>Өнөөдөр</div>
                <div>7 хоног</div>
                <div>Сараар</div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg mt-4 overflow-hidden">
            <div className="flex w-full items-center border-b py-[14px] px-3 justify-between">
              <div className="w-[20%] text-center">Захиалгын дугаар</div>
              <div className="w-[20%] text-center">Үйлчлүүлэгч</div>
              <div className="w-[10%] text-center">Огноо</div>
              <div className="w-[10%] text-center">Төлбөр</div>
            </div>
            <div className="flex flex-col bg-white">
              {productData.map((item, index) => {
                return (
                  <div
                    className="flex justify-between w-full py-4 items-center px-3 border-b"
                    key={index}
                  >
                    <div className="w-[20%] text-center">{item.id}</div>
                    <div className="w-[20%] text-center">
                      <div>{item.user.username}</div>
                      <div>{item.user.email}</div>
                    </div>
                    <div className="w-[10%] text-center">{item.date}</div>
                    <div className="w-[10%] text-center">{item.payment}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default income;
