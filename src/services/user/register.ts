import User from "../../models/User"
import argon2 from "argon2"
import { Error } from "mongoose"

interface UserInput {
  email: string
  username: string
  password: string
  firstname: string
  lastname: string
}

interface UserType {
  email: string
  username: string
  firstname: string
  lastname: string
  role: string
}

async function SignUp(userInfo: UserInput): Promise<UserType> {
  const { email, username, password, ...data } = userInfo

  const emailExist = await User.exists({ email: email })

  const userExist = await User.exists({ username: username })

  if (emailExist || userExist) {
    throw new Error("This account already exists")
  }

  const hashedPassword = await argon2.hash(password, {
    hashLength: 40,
  })

  const UserRecord = await User.create({
    email,
    username,
    password: hashedPassword,
    role: "guest",
    ...data,
  })

  const user = UserRecord.toObject()
  Reflect.deleteProperty(user, "password")
  return { ...user }
}

export default SignUp
