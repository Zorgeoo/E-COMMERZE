import { useState } from "react";
import { FaStar } from "react-icons/fa";

export const Review = () => {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <div className="border-gray-200 border-b border-dashed pt-6 pb-[21px]">
        <div className="flex items-center gap-2">
          <div>Saraag samarna</div>
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((item, index) => {
                return (
                  <FaStar
                    onClick={() => setRating(index + 1)}
                    className={`${
                      index + 1 <= rating ? "text-yellow-500" : ""
                    }`}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
        <div>Ваав материал ёстой гоё байна 😍</div>
      </div>
    </div>
  );
};
