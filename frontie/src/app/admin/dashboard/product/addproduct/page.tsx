"use client";
import { apiClient } from "@/components/axios/page";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const sizeData = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];
interface Category {
  categoryName: string;
  _id: string;
}
export default function Home() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [stock, SetStock] = useState<number | undefined>(undefined);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) setImage(files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);

    const res = await apiClient.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const uploadImages = [...imgUrl, res.data.secure_url];
    setImgUrl(uploadImages);
    setLoading(false);
  };
  const createProduct = async () => {
    try {
      await apiClient.post(
        "/product/",
        {
          productName,
          price,
          categoryId,
          description,
          sizes,
          images: imgUrl,
          stock,
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
      const response = await apiClient.get("/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.log("Can not get categories");
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

  console.log(stock);

  return (
    <div className="h-screen p-4">
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
              </div>
              <div className="flex flex-col p-6 gap-4 bg-white rounded-lg">
                <div className="font-semibold text-lg">
                  Бүтээгдэхүүний зураг
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    {imgUrl.map((item, index) => {
                      return (
                        <div key={index} className="flex-1">
                          <div className="relative w-[125px] h-[200px]">
                            <Image
                              src={item}
                              fill
                              alt="Product Image"
                              className="object-fill"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex-1 flex justify-center items-center gap-2">
                    <input
                      type="file"
                      className="text-sm"
                      onChange={handleChangeFile}
                    />
                    <button onClick={handleUpload}>
                      {loading ? "Uploading ..." : "Upload"}
                    </button>
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
                    value={stock}
                    onChange={(event) =>
                      SetStock(Number(event.target.value) || undefined)
                    }
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
