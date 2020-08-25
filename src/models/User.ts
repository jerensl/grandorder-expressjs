import { Schema, model, Document } from "mongoose"
import { UserModel } from "../interfaces/"

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "guest" },
  },
  { timestamps: true },
)

export default model<UserModel & Document>("User", UserSchema)
