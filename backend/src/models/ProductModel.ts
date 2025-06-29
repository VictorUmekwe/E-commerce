
import mongoose, { Schema } from 'mongoose'

  interface IProduct {
  name:string;
  slug: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;

}

const productSchema = new Schema<IProduct>({
  name:{type: String, required: true},
  slug:{type: String, required: true, unique: true},
  image:{type: String, required: true},
  brand:{type: String, required: true},
  category:{type: String, required: true},
  description:{type: String, required: true},
  price:{type: Number, required: true, default: 0},
  countInStock:{type: Number, required: true, default: 0},
  rating: {type: Number},
  numReviews:{type: Number},
},{timestamps: true})

const Product = mongoose.model<IProduct>('Product', productSchema)
export default Product;