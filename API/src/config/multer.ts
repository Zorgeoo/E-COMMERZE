import Multer, { memoryStorage } from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = memoryStorage();

export const upload = Multer({
  storage,
});
