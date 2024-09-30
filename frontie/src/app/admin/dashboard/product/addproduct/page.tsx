"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const sizeData = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

export default function home() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  interface Category {
    categoryName: string;
    _id: string;
  }

  const createProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3004/product/",
        {
          productName,
          price,
          categoryId,
          description,
          sizes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3004/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(allCategories);
  console.log(categoryId);
  console.log(sizes);

  const handleCategory = (id: string) => {
    if (categoryId?.includes(id)) {
      setCategoryId(categoryId.filter((filterId) => filterId !== id));
    } else {
      setCategoryId([...categoryId, id]);
    }
  };

  const handleSize = (size: string) => {
    if (sizes?.includes(size)) {
      setSizes(sizes.filter((sizeName) => sizeName !== size));
    } else {
      setSizes([...sizes, size]);
    }
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
                    onChange={(event) => setProductName(event.target.value)}
                    value={productName}
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
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
                    value={price}
                    type="number"
                    onChange={(event) =>
                      setPrice(Number(event.target.value) || undefined)
                    }
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
                  <div className="flex flex-col gap-1">
                    {allCategories?.map((item, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="checkbox"
                            id={item.categoryName}
                            checked={categoryId?.includes(item._id)}
                            onChange={() => handleCategory(item._id)}
                          />
                          {item.categoryName}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg w-full flex flex-col gap-6 p-6">
                <div className="font-semibold">Хэмжээ</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-6">
                    <div className="flex gap-3 justify-center">
                      {sizeData.map((size, index) => {
                        return (
                          <label key={index}>
                            <input
                              type="checkbox"
                              id={size}
                              checked={sizes?.includes(size)}
                              onClick={() => handleSize(size)}
                            />
                            {size}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-6">
                  <div className="border bg-white font-semibold rounded-lg w-fit px-5 py-4 text-lg">
                    Ноорог
                  </div>
                  <div
                    className="bg-black text-white font-semibold rounded-lg w-fit px-5 py-4 text-lg"
                    onClick={createProduct}
                  >
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
