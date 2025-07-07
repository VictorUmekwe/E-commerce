
import { IUser } from "../../models/UserModel";
import "express";

declare module "express" {
    interface Request {
        user?: IUser;
    }
}