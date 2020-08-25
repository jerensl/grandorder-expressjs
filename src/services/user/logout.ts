import { Request, Response } from "express"

async function SignOut(req: Request, res: Response): Promise<void> {
  try {
    if (!req.session) {
      throw new Error("You are dont have session")
    }
    req.session.destroy((err) => {
      if (err) {
        throw new Error("You are dont have session")
      }
      res
        .clearCookie(process.env.SESSION_NAME)
        .status(201)
        .json({ message: "Logout Success" })
    })
  } catch (e) {
    throw new Error(e)
  }
}

export default SignOut
