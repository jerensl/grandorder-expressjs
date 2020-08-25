import express, { Request, Response, NextFunction } from "express"
import routes from "../api/"
import helmet from "helmet"
import cors, { CorsOptions } from "cors"

function loadExpress({ app }: { app: express.Application }): void {
  const corsOpts: CorsOptions = {
    credentials: true,
    origin: [process.env.ORIGIN_TARGET],
  }

  app.use(helmet())
  app.set("trust proxy", 1)
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors(corsOpts))

  app.use("/api", routes())

  // Tangkap Error ketika mengakses url yang tidak ada
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error("Not Found")
    err.status = 404
    next(err)
  })

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message,
      },
    })
  })
  app.options("*", cors(corsOpts))
}

export default loadExpress
