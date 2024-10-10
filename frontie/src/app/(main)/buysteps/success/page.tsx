import Image from "next/image";

const Success = () => {
  return (
    <div className="bg-[#F4F4F5] h-screen ">
      <div className="w-[1280px] m-auto flex border h-2/3 ">
        <div className="h-fit flex flex-col justify-center items-center bg-white border w-fit m-auto px-[7px] py-14 rounded-2xl">
          <div className="relative w-8 h-8">
            <Image fill src={`/check-circle.png`} alt="" />
          </div>
          <div>Захиалга амжилттай баталгаажлаа.</div>
        </div>
      </div>
    </div>
  );
};
export default Success;
