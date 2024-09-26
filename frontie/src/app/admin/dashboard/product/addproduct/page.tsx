import { FaArrowLeft } from "react-icons/fa";

export default function home() {
  const createProduct = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="bg-[#1C20240A] h-screen p-4">
      <div className="flex w-[940px] m-auto gap-4">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex gap-4 items-center p-4 bg-white">
            <div className="">
              <FaArrowLeft />
            </div>
            <div>Бүтээгдэхүүн нэмэх</div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="p-6 flex flex-col bg-white rounded-lg  gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-[#121316]">
                    Бүтээгдэхүүний нэр
                  </div>
                  <input
                    placeholder="Нэр"
                    className="bg-[#F7F7F8] text-[#8B8E95] p-2 rounded-lg w-full"
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-[#121316]">
                    Нэмэлт мэдээлэл
                  </div>
                  <textarea
                    placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
                    className="bg-[#F7F7F8] text-[#8B8E95] p-2 rounded-lg w-full  resize-none"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-[#121316]">
                    Барааны код
                  </div>
                  <input
                    placeholder="#12345678"
                    className="bg-[#F7F7F8] text-[#8B8E95] p-2 rounded-lg w-full"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col p-6 gap-4 bg-white rounded-lg">
                <div className="font-semibold text-lg">
                  Бүтээгдэхүүний зураг
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 border-2 rounded-lg border-dashed h-[124px]"></div>
                  <div className="flex-1 border-2 rounded-lg border-dashed h-[124px]"></div>
                  <div className="flex-1 border-2 rounded-lg border-dashed h-[124px]"></div>
                  <div className="flex-1 flex justify-center items-center">
                    +
                  </div>
                </div>
              </div>
              <div className="flex  p-6 gap-4 bg-white rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Үндсэн үнэ</div>
                  <input
                    className="p-3 bg-[#F7F7F8] text-[#8B8E95] rounded-lg w-full"
                    placeholder="Үндсэн үнэ"
                  ></input>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    Үлдэгдэл тоо ширхэг
                  </div>
                  <input
                    className="p-3 bg-[#F7F7F8] text-[#8B8E95] rounded-lg w-full"
                    placeholder="Үлдэгдэл тоо ширхэг"
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white rounded-lg w-full flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Ерөнхий ангилал</div>
                </div>
              </div>
              <div className="bg-white rounded-lg w-full flex flex-col gap-6 p-6">
                <div className="font-semibold">Төрөл</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-6">
                    <div>Өнгө</div>
                    <div>+</div>
                  </div>
                  <div className="flex gap-6">
                    <div>Хэмжээ</div>
                    <div>+</div>
                  </div>
                </div>
                <div className="border rounded-lg text-sm font-semibold w-fit py-2 px-3">
                  Төрөл нэмэх
                </div>
              </div>
              <div className="bg-white rounded-lg w-full flex flex-col gap-2 px-6 py-5">
                <div className="font-semibold">Таг</div>
                <textarea
                  placeholder="Таг нэмэх..."
                  className="border rounded-lg text-[#8B8E95] bg-[#F7F7F8] p-1 resize-none"
                ></textarea>
                <div className="text-sm text-[#5E6166]">
                  Санал болгох: Гутал , Цүнх , Эмэгтэй{" "}
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-6">
                  <div className="border bg-white font-semibold rounded-lg w-fit px-5 py-4 text-lg">
                    Ноорог
                  </div>
                  <div className="bg-black text-white font-semibold rounded-lg w-fit px-5 py-4 text-lg">
                    Нийтлэх
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
