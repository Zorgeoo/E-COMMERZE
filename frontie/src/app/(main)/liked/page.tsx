import { DeliveryCard } from "@/components/co-components/DeliveryCard";
const productData = [
  { img: "/hoodie.png", title: "Hoodie", price: 12000 },
  { img: "/boy.png", title: "Chunky boy", price: 13000 },
  { img: "/girlwithcap.png", title: "Cap", price: 124000 },
];
const Liked = () => {
  return (
    <div className="min-h-[70vh]">
      <div className="w-[1280px] m-auto border">
        <div>Хадгалсан бараа ({productData.length})</div>
        <div>
          {productData.map((item, index) => {
            return <DeliveryCard key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Liked;
