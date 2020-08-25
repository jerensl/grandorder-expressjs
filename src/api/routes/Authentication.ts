import { Router, Request, Response, NextFunction } from "express"

import { registerBody, loginBody, resetPassBody } from "../middlewares/userBody"
import { resetPassword, sendVerification } from "../../services/mail"
import Logger from "../../loaders/logger"
import {
  SignIn,
  SignOut,
  SignUp,
  NewPassword,
  ConfirmAccount,
  isLoggedIn,
  isLogout,
} from "../../services/user"

const route = Router()

function authRouter(app: Router): void {
  app.use("/authentication", route)

  route.post(
    "/register",
    registerBody,
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug("Calling Sign-Up endpoint with body: %o", req.body)
      try {
        const { email, username, password, ...data } = req.body
        const { host } = req.headers

        const user = await SignUp({ email, username, password, ...data })

        console.log(user, host)

        await sendVerification({
          email: user.email,
          username: user.username,
          host,
        })
        res.status(201).json({ message: "Sucess" })
      } catch (e) {
        next(e)
      }
    },
  )

  route.post(
    "/login",
    isLoggedIn,
    loginBody,
    async (req: Request, res: Response, next: NextFunction) => {
      Logger.debug("Calling Sign-Up endpoint with body: %o", req.body)

      try {
        const { email, password } = req.body
        const userInfo = await SignIn({ email, password })
        req.session.userId = userInfo
        res.status(200).json({ user: userInfo, message: "Login Sucess" })
      } catch (e) {
        e.status = 401
        next(e)
      }
    },
  )

  route.get(
    "/logout",
    isLogout,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await SignOut(req, res)
      } catch (e) {
        e.status = 401
        next(e)
      }
    },
  )

  route.get(
    "/verify/:token",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.params.token
        ConfirmAccount({ token })
        res
          .status(201)
          .json({ message: "This account has been verified. Please log in." })
      } catch (e) {
        e.status = 401
        next(e)
      }
    },
  )

  route.post(
    "/changepassword",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = req.body
        const { host } = req.headers
        await resetPassword({ email, host })
        res.status(201).json({ message: "Please check your email" })
      } catch (e) {
        e.status = 401

        next(e)
      }
    },
  )

  route.post(
    "/changepassword/:token",
    resetPassBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.params.token
        const newPassword = req.body.password
        await NewPassword({ token, newPassword })
        res
          .status(200)
          .json({ message: "Your Password has been changed. Please Login" })
      } catch (e) {
        e.status = 401

        next(e)
      }
    },
  )
}

export default authRouter
