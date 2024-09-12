import { AdminBurgerBar } from "@/components/AdminBurgerBar";

const order = () => {
  return (
    <div className="bg-[#1C20240A]">
      <div className="w-[1280px] m-auto flex">
        <AdminBurgerBar />
        <div>
          <div className="flex border-b w-full">
            <div className="py-3 px-4">Бүгд</div>
            <div className="py-3 px-4">Шинэ захиалга</div>
            <div className="py-3 px-4">Бэлтгэгдэж байна</div>
            <div className="py-3 px-4">Хүргэлтэнд гарсан</div>
            <div className="py-3 px-4">Хүргэгдсэн</div>
            <div className="py-3 px-4">Цуцлагдсан</div>
          </div>
          <div className="flex justify-between py-6">
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
                className="bg-white rounded-lg px-4 py-[10px] border"
                type="search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default order;
