import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

function generateToken({ ...signature }: Record<string, string>): string {
  const token = jwt.sign(
    {
      ...signature,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30m" },
  )
  return token
}

export default generateToken
