import { Router, Request, Response, NextFunction } from "express"

const route = Router()

function Authorization(app: Router): void {
  app.use("/authorization", route)

  route.get(
    "/status",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.session.userId) {
          throw new Error("You are not Login")
        }
        res.status(200).json({
          user: req.session.userId,
          message: "You are authorized as User",
        })
      } catch (e) {
        e.status = 401
        next(e)
      }
    },
  )
}

export default Authorization
