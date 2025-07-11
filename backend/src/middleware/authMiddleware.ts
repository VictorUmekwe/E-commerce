import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../models/UserModel";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(400);
      throw new Error("Not authorized");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");

      }
      req.user = user
      next()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }
);

// Admin middleware
const admin = (req:Request, res:Response, next:NextFunction) => {
    if(req.user && req.user.isAdmin){
      next()
    }else{
      res.status(403)
      throw new Error('Not authorized')
    }
}

export { protect, admin};
