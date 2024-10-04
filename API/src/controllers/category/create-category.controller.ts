import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    const { categoryName } = req.body;
    console.log(categoryName);

    await categoryModel.create({
      categoryName,
    });

    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
