import { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import Order from "../models/OrderModel";

const createOrder = asyncHandler(async(req:Request, res:Response) => {
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice, totalPrice} = req.body
       
    if(!orderItems || orderItems.length === 0){
        res.status(400);
        throw new Error('Cart is empty')
    }

   
     const order = new Order({
        user: req.user?._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,totalPrice,
     })

     const createdOrder = await order.save()
     res.status(201).json(createdOrder)
})

export {createOrder}