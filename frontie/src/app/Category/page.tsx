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
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
  { img: "/magazine.png", title: "The Prompt magazine", price: 126000 },
  { img: "/Waterbottle.png", title: "Bottle", price: 127000 },
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Sweater", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
];
export const Category = () => {
  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        <div className="flex flex-col gap-12 border pr-40">
          <div>
            <div className="font-bold">Ангилал</div>
            <div className="flex flex-col gap-2 pt-4">
              <div>Малгай</div>
              <div>Усны сав</div>
              <div>T-shirt</div>
              <div>Hoodie</div>
              <div>Tee</div>
              <div>Цүнх</div>
            </div>
          </div>
          <div>
            <div className="font-bold">Хэмжээ</div>
            <div className="flex flex-col gap-2 pt-4">
              <div>Free</div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>2XL</div>
              <div>3XL</div>
            </div>
          </div>
        </div>
        <div className="h-[2147px] w-[774px] grid grid-cols-3 grid-rows-5 gap-x-5 gap-y-12">
          {productData.map((item, index) => {
            return (
              <div key={index}>
                <ProductCard
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  customHeight="290px"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Category;
