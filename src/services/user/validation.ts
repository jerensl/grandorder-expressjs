import { Request, Response, NextFunction } from "express"

function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
  try {
    if (req.session.userId) {
      throw new Error("You are LoggedIn")
    }

    next()
  } catch (e) {
    e.status = 401

    next(e)
  }
}

function isLogout(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.session.userId) {
      throw new Error("Please, Login First")
    }

    next()
  } catch (e) {
    e.status = 401
    next(e)
  }
}

export { isLoggedIn, isLogout }
