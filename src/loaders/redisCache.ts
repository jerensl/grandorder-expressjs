import Redis, { RedisOptions } from "ioredis"
import * as dotenv from "dotenv"

dotenv.config()

const RedisSetting: RedisOptions = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  connectTimeout: 10000,
}

export default new Redis(RedisSetting)
