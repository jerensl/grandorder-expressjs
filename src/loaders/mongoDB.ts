import { connect, ConnectionOptions } from "mongoose"

async function loadDatabase(): Promise<ConnectionOptions> {
  const connectDB = await connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  return connectDB.connection.db
}

export default loadDatabase
