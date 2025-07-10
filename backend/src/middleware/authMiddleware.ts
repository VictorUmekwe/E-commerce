import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import User, { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";

interface AuthenticateRequest extends Request {
  user?: IUser;
}

const protect = expressAsyncHandler(
  async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        user: IUser;
      };

      const user = await User.findById(decoded.user._id).select("- password");

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      req.user = user;
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
);
//Admin middleware
const admin = (req:AuthenticateRequest, res:Response, next:NextFunction) => {
    if(req.user && req.user.isAdmin){
      next()
    }else{
      res.status(403)
      throw new Error('Not authorized')
    }
}

export { protect, admin};
