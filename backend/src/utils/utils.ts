import {Response} from 'express'
import jwt from "jsonwebtoken";

 const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({id: userId}, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  })

  res.cookie('jwt', token, {
    httpOnly:  true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge:  7 * 24 * 60 * 60 * 1000,
  })
}

export default generateToken