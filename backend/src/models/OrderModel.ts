import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./UserModel";
import { IProduct } from "./ProductModel";

export interface IOrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  Product: mongoose.Types.ObjectId | IProduct;
}

export interface IShippingAddress {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface IPaymentResult {
  paymentId?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId | IUser;
  orderItems: IOrderItem[];
  shippingAddress?: IShippingAddress;
  paymentMethod: string;
  paymentResult?: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    Product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema<IShippingAddress>(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  { _id: false }
);

const paymentResultSchema = new Schema<IPaymentResult>(
  {
    paymentId: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder> ({
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {type: String, required: true},
    paymentResult: paymentResultSchema,
    itemsPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered:{type: Boolean, default: false },
    deliveredAt:  { type: Date}
}, {timestamps: true})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order;