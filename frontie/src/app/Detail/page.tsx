"use client";
import { DetailedProduct } from "@/components/co-components/DetailedProduct";
import { ProductCard } from "@/components/co-components/ProductCard";

const productData = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
  { img: "/magazine.png", title: "The Prompt magazine", price: 126000 },
  { img: "/Waterbottle.png", title: "Bottle", price: 127000 },
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Sweater", price: 13000 },
];
export const Detail = () => {
  return (
    <div>
      <div className="w-[1280px] m-auto">
        <DetailedProduct />
        <div className="pb-[100px]">
          <div className="font-bold text-[30px] pb-6">Холбоотой бараа</div>
          <div className="grid grid-cols-4 gap-x-[21px] gap-y-12">
            {productData.map((item, index) => {
              return (
                <div key={index}>
                  <ProductCard
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    customHeight="331px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
