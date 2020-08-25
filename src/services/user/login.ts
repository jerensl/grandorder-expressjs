import User from "../../models/User"
import argon2 from "argon2"
import { Request, Response } from "express"

interface UserType {
  email: string
  username: string
  firstname: string
  lastname: string
  role: string
}

interface UserInput {
  email: string
  password: string
}

async function SignIn({ email, password }: UserInput): Promise<UserType> {
  const userRecord = await User.findOne({ email })

  if (!userRecord) {
    throw new Error("Invalid email or password")
  }
  if (userRecord.role === "guest") {
    throw new Error("Your account has not been verified")
  }

  const verifyPassword = await argon2.verify(userRecord.password, password)

  if (!verifyPassword) {
    throw new Error("Invalid email or password")
  }

  const user = userRecord.toObject()
  Reflect.deleteProperty(user, "password")
  Reflect.deleteProperty(user, "_id")
  Reflect.deleteProperty(user, "createdAt")
  Reflect.deleteProperty(user, "updatedAt")
  Reflect.deleteProperty(user, "__v")
  return { ...user }
}

export default SignIn
