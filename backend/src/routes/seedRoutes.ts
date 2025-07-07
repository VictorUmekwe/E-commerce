import express, {Request,Response} from 'express'
import { sampleProducts, sampleUsers } from '../data';
import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel';
import User from '../models/UserModel';

export const seedRouter = express.Router()

seedRouter.get('/', asyncHandler(async(req: Request, res: Response) => {
      await Product.deleteMany({})
      const createdProducts = await Product.insertMany(sampleProducts)

      await User.deleteMany({})
      const createdUsers = await User.insertMany(sampleUsers)

      res.status(201).json({createdProducts, createdUsers})
}));




