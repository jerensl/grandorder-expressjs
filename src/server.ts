import loadDatabase from "./loaders/mongoDB"
import loadExpress from "./loaders/express"
import loadSession from "./loaders/session"
import express from "express"
import logger from "./loaders/logger"
import apolloServer from "./loaders/graphql"
import * as dotenv from "dotenv"

dotenv.config()

async function StartServer() {
  const app = express()

  await loadDatabase()
    .then(() => logger.info("Database Ready"))
    .catch(() =>
      logger.error("Database not Connected. Please Check Your DB Url"),
    )

  loadSession({ app })

  await apolloServer({ app })
    .then(() => logger.info("Apollo Ready"))
    .catch(() => logger.error("Something Wrong with GraphQL"))

  loadExpress({ app })

  app.listen(+process.env.PORT, "0.0.0.0", (err) => {
    if (err) {
      logger.error(err)
      process.exit(1)
      return
    }
    logger.info(`🛡️Server listening on http://localhost:${process.env.PORT}🛡️`)
  })
}

StartServer()
