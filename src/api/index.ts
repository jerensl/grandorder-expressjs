import { Router } from "express"
import Authentication from "./routes/Authentication"
import Authorization from "./routes/Authorization"

export default (): Router => {
  const app = Router()
  Authentication(app)
  Authorization(app)

  return app
}
