import Image from "next/image";
import { CiHeart } from "react-icons/ci";

interface MyComponentProps {
  img: string;
  title: string;
  price: number;
  customHeight: string;
}
export const ProductCard: React.FC<MyComponentProps> = ({
  img,
  title,
  price,
  customHeight,
}) => {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col gap-2 h-fit">
      <div
        className={`relative rounded-xl w-full overflow-hidden`}
        style={{ height: customHeight }}
      >
        <Image
          className="object-cover rounded-xl hover:scale-150 duration-[2000ms]"
          src={img}
          fill
          quality={100}
          alt="hello"
        />
        <CiHeart className="absolute right-4 cursor-pointer top-4 w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <div>{title}</div>
        <div className="font-bold">{price.toLocaleString()}₮</div>
      </div>
    </div>
  );
};
