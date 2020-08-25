import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"

import { EventResolver } from "../api/resolvers/EventResolver"
import { ParticipantResolver } from "../api/resolvers/ParticipantResolver"

const apolloServer = async ({
  app,
}: {
  app: express.Application
}): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [EventResolver, ParticipantResolver],
    emitSchemaFile: true,
    validate: false,
  })

  const server = new ApolloServer({
    schema,
  })

  server.applyMiddleware({ app, path: "/graphql" })
}

export default apolloServer
