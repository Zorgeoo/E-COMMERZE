import { AdminBurgerBar } from "@/components/AdminBurgerBar";

const productData = [
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    time: "10:58",
    payment: 12000,
    status: "хүргэгдсэн",
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    time: "10:58",
    payment: 12000,
    status: "хүргэгдсэн",
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    time: "10:58",
    payment: 12000,
    status: "хүргэгдсэн",
  },
  {
    id: "#12345",
    user: { username: "Zoloo", email: "Zoloo@gmail.com" },
    date: "2023.01.09",
    time: "10:58",
    payment: 12000,
    status: "хүргэгдсэн",
  },
];
const order = () => {
  return (
    <div className="bg-[#1C20240A] h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="w-full">
          <div className="flex border-b w-full">
            <div className="py-3 px-4">Бүгд</div>
            <div className="py-3 px-4">Шинэ захиалга</div>
            <div className="py-3 px-4">Бэлтгэгдэж байна</div>
            <div className="py-3 px-4">Хүргэлтэнд гарсан</div>
            <div className="py-3 px-4">Хүргэгдсэн</div>
            <div className="py-3 px-4">Цуцлагдсан</div>
          </div>
          <div className="flex justify-between py-6 px-4">
            <div className="flex gap-2">
              <button className="px-4 py-[10px] border bg-white rounded-[8px]">
                Өнөөдөр
              </button>
              <button className="px-4 py-[10px] border bg-white rounded-[8px]">
                7 хоног
              </button>
              <div className="px-4 py-[10px] border bg-white rounded-[8px]">
                Сараар
              </div>
            </div>
            <div>
              <input
                placeholder="Дугаар, имэйл"
                className="bg-white rounded-lg px-4 py-[10px] border mr-2"
                type="search"
              />
            </div>
          </div>
          <div className="border rounded-[12px] overflow-hidden mx-6">
            <div className="text-[20xp] font-semibold px-6 py-5 bg-white">
              Захиалга
            </div>
            <div>
              <div className="flex w-full items-center bg-[#ECEDF0] py-[14px] px-3 justify-between">
                <div className="w-[20%] text-center">Захиалгын дугаар</div>
                <div className="w-[20%] text-center">Үйлчлүүлэгч</div>
                <div className="w-[10%] text-center">Огноо</div>
                <div className="w-[10%] text-center">Цаг</div>
                <div className="w-[10%] text-center">Төлбөр</div>
                <div className="w-[15%] text-center">Статус</div>
                <div className="w-[15%] text-center">Дэлгэрэнгүй</div>
              </div>
              <div className="flex flex-col">
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
                      <div className="w-[10%] text-center">{item.time}</div>
                      <div className="w-[10%] text-center">{item.payment}</div>
                      <div className="w-[15%] text-center">{item.status}</div>
                      <div className="w-[15%] text-center">dasda</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default order;
