import User from "../../models/User"
import argon2 from "argon2"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config()

interface ChangePasswordInput {
  token: string
  newPassword: string
}

async function changePassword({
  token,
  newPassword,
}: ChangePasswordInput): Promise<void> {
  const getToken = jwt.verify(token, process.env.JWT_SECRET)
  const { email }: any = getToken
  const userRecord = await User.findOne({ email: email })

  if (!getToken || !userRecord) {
    throw new Error("Invalid Token")
  }

  const hashPassword = await argon2.hash(newPassword, {
    hashLength: 40,
  })

  userRecord.password = hashPassword
  userRecord.save()
}

export default changePassword
