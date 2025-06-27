import express, {Request,Response} from 'express'
import { sampleProducts } from '../data';
import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel';

export const seedRouter = express.Router()

seedRouter.get('/', asyncHandler(async(req: Request, res: Response) => {
      await Product.deleteMany({})
      const createdProducts = await Product.insertMany(sampleProducts)
      res.status(201).json({createdProducts})
}));




