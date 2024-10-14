"use client";
import { ProductCard } from "@/components/co-components/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useProductContext } from "@/components/utils/context";
import { apiClient } from "@/components/axios/page";
import { toast } from "react-toastify";

type ParamsType = {
  id: string;
};

type ProductType = {
  productName: string;
  price: string;
  images: string[];
  _id: string;
  sizes: string[];
  averageRating: number;
  reviewCount: number;
  description: string;
  stock: number;
};

interface Product {
  images: string[];
  productName: string;
  price: number;
  _id: string;
}

type userIdType = {
  username: string;
  _id: string;
};
type ReviewType = {
  productId: string;
  userId: userIdType;
  comment: string;
  rating: number;
};

const Detail: React.FC = () => {
  const [product, setProduct] = useState<ProductType>();

  const [heartFill, setHeartFill] = useState(false);
  const [hiddenElement, setHiddenElement] = useState(false);
  const [count, setCount] = useState(1);

  const [sizeChange, setSizeChange] = useState("");

  //Review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const { user, getMe } = useProductContext();
  const { id } = useParams<ParamsType>(); //ID-aa paramsaas avna

  const [allReviews, setAllReviews] = useState<ReviewType[]>();

  const getOneProduct = async (id: string) => {
    try {
      const response = await apiClient.get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProduct(response.data.product);
      console.log(response.data.product);
    } catch (error) {
      console.log("Can not get product infos");
    }
  };

  const handleLikedProducts = async (productId: string) => {
    setHeartFill(!heartFill);
    if (user) {
      try {
        await apiClient.post(
          "/user/liked",
          {
            userId: user.id,
            productId: productId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        getMe();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  const getReviewByProductId = async (id: string) => {
    try {
      const response = await apiClient.get(`/review/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await apiClient.get("/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.products);
    } catch (error) {
      console.log("Can not get products");
    }
  };
  const createReview = async (
    productId: string,
    userId: string,
    comment: string,
    rating: number
  ) => {
    try {
      await apiClient.post(
        "/review/",
        {
          productId,
          userId,
          comment,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComment("");
      setRating(0);
      await getReviewByProductId(id);
      getOneProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneProduct(id), getProducts();
  }, []);

  useEffect(() => {
    getReviewByProductId(id);
  }, []);
  useEffect(() => {}, []);

  const buyProduct = async () => {
    if (!sizeChange) {
      toast.error("Та бүтээгдэхүүний размераа сонгоно уу!");
      return;
    }
    try {
      await apiClient.post(
        `/cart`,
        {
          userId: user?.id,
          quantity: count,
          cartProducts: id,
          size: sizeChange,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Сагсанд нэмэгдлээ");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div>
          <div className="w-[1280px] m-auto">
            <div className="flex gap-5 pt-[52px] pb-20">
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 pt-16">
                  {product?.images.map((item, index) => {
                    return (
                      <div key={index} className="relative h-[67px] w-[67px]">
                        <Image
                          alt=""
                          fill
                          src={item}
                          className={`object-cover rounded-md ${
                            currentImage === index
                              ? "border border-[#09090B]"
                              : ""
                          }`}
                          onClick={() => setCurrentImage(index)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="relative h-[521px] w-[422px]">
                  {product?.images ? (
                    <Image
                      alt=""
                      src={product.images[currentImage]}
                      fill
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div>Loading</div>
                  )}
                </div>
              </div>
              <div className="pt-[100px] flex flex-col gap-6">
                <div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <div>{product?.productName}</div>
                      <div>
                        <FaHeart
                          onClick={() => handleLikedProducts(id)}
                          className={`cursor-pointer top-4 w-6 h-6 ${
                            user?.liked.some(
                              (item) => item._id.toString() === id
                            )
                              ? "text-red-700"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div>{product?.description}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="underline">Размерууд</div>
                    <div className="flex gap-1">
                      {product?.sizes.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex justify-center text-sm items-center p-2 w-8 h-8 rounded-full border border-black text-black hover:bg-[#E4E4E7] ${
                              sizeChange === item
                                ? "bg-black text-white hover:bg-black"
                                : "bg-white"
                            }`}
                            onClick={() => setSizeChange(item)}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                      onClick={() =>
                        setCount((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                    >
                      -
                    </div>
                    <div>{count}</div>
                    <div
                      className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                      onClick={() =>
                        setCount((prev) =>
                          prev < (product?.stock ?? 0) ? prev + 1 : prev
                        )
                      }
                    >
                      +
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="underline">Барааны үлдэгдэл:</div>
                    <div className="font-semibold">{product?.stock}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[20px] pb-2">
                    {product?.price.toLocaleString()}₮
                  </div>
                  <button
                    onClick={buyProduct}
                    className="text-white bg-[#2563EB] py-2 px-9 rounded-full"
                  >
                    Сагсанд нэмэх
                  </button>
                </div>
                <div>
                  <div className="flex gap-4">
                    <div>Үнэлгээ</div>
                    <div
                      onClick={() => {
                        setHiddenElement(!hiddenElement);
                      }}
                    >
                      {hiddenElement ? "Бүгдийг хураах" : "Бүгдийг харах"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => {
                          return (
                            <FaStar
                              className={`${
                                product
                                  ? product?.averageRating >= index + 1
                                    ? "text-yellow-400"
                                    : ""
                                  : ""
                              }`}
                            />
                          );
                        })}
                    </div>
                    <div className="flex gap-2">
                      <div className="font-bold">
                        {product?.averageRating?.toFixed(1)}
                      </div>
                      <div className="text-gray-400">
                        ({product?.reviewCount})
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${hiddenElement ? "block" : "hidden"}`}>
                  <div className="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">
                    <div>
                      <div>Одоор үнэлэх:</div>
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((item, index) => {
                            return (
                              <FaStar
                                onClick={() => {
                                  setRating(index + 1);
                                }}
                                className={`${
                                  index + 1 <= rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                key={index}
                              />
                            );
                          })}
                      </div>
                    </div>
                    <div className="flex gap-6 flex-col">
                      <div>Сэтгэгдэл үлдээх:</div>
                      <div className="w-full">
                        <input
                          className="border w-full h-[94px] rounded-lg"
                          placeholder="Энд бичнэ үү"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setComment(event.target.value)}
                        />
                      </div>
                      <button
                        onClick={() =>
                          createReview(id, user?.id ?? "", comment, rating)
                        }
                        className="bg-[#2563EB] w-fit text-white py-2 px-9 rounded-full"
                      >
                        Үнэлэх
                      </button>
                    </div>
                  </div>
                  {allReviews?.map((review, indexAll) => {
                    return (
                      <div key={indexAll}>
                        <div className="border-gray-200 border-b border-dashed pt-6 pb-[21px]">
                          <div className="flex items-center gap-2">
                            <div>{review.userId?.username}</div>
                            <div className="flex">
                              {Array(5)
                                .fill(null)
                                .map((item, index) => {
                                  return (
                                    <FaStar
                                      className={`${
                                        index + 1 <= review.rating
                                          ? "text-yellow-500"
                                          : ""
                                      }`}
                                      key={index}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                          <div>{review.comment}😍</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-[100px]">
          <div className="font-bold text-[30px] pb-6">Холбоотой бараа</div>
          <div className="grid grid-cols-4 gap-x-[21px] gap-y-12">
            {allProducts?.slice(0, 8).map((item, index) => {
              return (
                <Link key={index} href={`${item._id}`}>
                  <div>
                    <ProductCard
                      img={item.images[0]}
                      title={item.productName}
                      price={item.price}
                      customHeight="331px"
                      id={item._id}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
