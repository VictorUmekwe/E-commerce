import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Product from "../models/ProductModel";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  if (!products) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(products);
});

const getProduct = asyncHandler(async(req:Request, res:Response) => {
     const product = await Product.findOne({slug: req.params.slug})
     if(!product){
        res.status(404);
        throw new Error('Product not found')
     }

     res.status(200).json(product);
})

export { getProducts, getProduct };



