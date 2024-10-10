
const settings = () => {
  return (
    <div className="bg-[#1C20240A] h-screen">
      <div className="w-[985px] m-auto flex">
        <div className="flex flex-col bg-white rounded-lg h-fit px-6 py-8 m-auto gap-2 w-1/2">
          <div className="font-bold">Тохиргоо</div>
          <div className="flex justify-between border rounded-lg py-2 px-3 items-center">
            <div>Баннер зураг</div>
            <div className="border rounded-lg py-2 px-3">Солих</div>
          </div>
          <div className="flex justify-between border rounded-lg py-2 px-3 items-center">
            <div>Эхний бүтээгдэхүүнээ нэмнэ үү</div>
            <div className="border rounded-lg py-2 px-3">
              Бүтээгдэхүүн нэмэх
            </div>
          </div>
          <div className="flex justify-between border rounded-lg py-2 px-3 items-center">
            <div>Хүргэлтийг тохируулна уу</div>
            <div className="border rounded-lg py-2 px-3">
              Хүргэлт тохируулах
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default settings;
