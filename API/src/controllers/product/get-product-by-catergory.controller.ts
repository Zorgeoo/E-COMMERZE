// import { RequestHandler } from "express";
// import { productModel } from "../../models/product.schema";

// export const getProductsByCategoryController: RequestHandler = async (
//   req,
//   res
// ) => {
//   const { categoryId } = req.query; // Extract categoryId from the query parameters

//   try {
//     // If categoryId is provided, filter products by that category
//     let query: any = {};
//     if (categoryId) {
//       query.category = categoryId;
//     }

//     // Fetch products based on the query
//     const products = await productModel.find(query);

//     if (!products.length) {
//       return res.status(404).json({
//         message: "No products found in this category",
//       });
//     }

//     return res.status(200).json({
//       products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
