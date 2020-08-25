import User from "../../models/User"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

async function ConfirmAccountByEmail({ token }: any): Promise<any> {
  const { email }: any = jwt.verify(token, process.env.JWT_SECRET)
  const userRecord = await User.findOne({ email: email })
  if (!email || !userRecord) {
    throw new Error("Invalid Token")
  }

  if (userRecord.role !== "guest") {
    throw new Error("This user has already been verified.")
  }

  userRecord.role = "user"
  userRecord.save()
}

export default ConfirmAccountByEmail
