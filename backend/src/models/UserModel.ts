import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true},
    email:{type: String, required: true, unique: true, lowercase:true, trim: true},
    password:{type: String, required: true, minLength: [6, 'Password must not be less than 6 characters']},
    isAdmin:{type: Boolean, default: false},
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
