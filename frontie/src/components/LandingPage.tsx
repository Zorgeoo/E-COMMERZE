import { ProductCard } from "./co-components/ProductCard";

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
  { img: "/magazine.png", title: "The Prompt magazine", price: 126000 },
  { img: "/Waterbottle.png", title: "Bottle", price: 127000 },
  { img: "/girlWithTshirt.png", title: "Tee", price: 125000 },
];

export const LandingPage = () => {
  return (
    <div>
      <div className="w-[1280px] m-auto p-14">
        <div className="h-[3000px] w-full grid grid-cols-4 grid-rows-7 gap-x-5 gap-y-8 [&>div:nth-child(1)]:col-span-4 [&>div:nth-child(8)]:col-span-2 [&>div:nth-child(8)]:row-span-2 [&>div:nth-child(9)]:row-span-2 [&>div:nth-child(9)]:col-span-2">
          {productData.map((item, index) => {
            const customHeight =
              index === 7 ? "764px" : index === 8 ? "764px" : "331px";
            return (
              <div key={index}>
                <ProductCard
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  customHeight={customHeight}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
