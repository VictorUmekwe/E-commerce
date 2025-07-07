import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import { generateToken } from "../utils/utils";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    const token = generateToken(user);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } else {
    res.status(500);
    throw new Error("Error creating user");
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  }else{
    res.status(400);
    throw new Error('Invalid credentials')
  }
});

const logoutUser = asyncHandler(async(req:Request, res:Response) => {
    res.cookie('jwt' , "", {httpOnly:true, expires: new Date(0)})
    res.status(200).json({message: 'Logged out'})
})

export { registerUser, loginUser, logoutUser };
