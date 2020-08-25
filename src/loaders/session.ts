import { SessionOptions } from "express-session"
import connectRedis from "connect-redis"
import session from "express-session"
import redis from "./redisCache"
import express from "express"

const RedisStore = connectRedis(session)

const SESSION_OPTIONS: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  cookie: {
    maxAge: 1000 * 60 * 30,
    sameSite: "lax",
    httpOnly: false, // jika aktif tidak bisa mengakses cookie pada client melalui document.cookie
    // secure: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
}

function loadSession({ app }: { app: express.Application }): void {
  app.use(
    session({
      ...SESSION_OPTIONS,
      store: new RedisStore({ client: redis }),
    }),
  )
}

export default loadSession
