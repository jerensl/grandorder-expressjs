import { prop, getModelForClass } from "@typegoose/typegoose"
import { ObjectType, Field, ID } from "type-graphql"
import { Participant } from "./Participant"

import { Types } from "mongoose"
import { string } from "@hapi/joi"

@ObjectType({ description: "Event" })
export class Events {
  @Field(() => ID)
  id: string

  @Field()
  @prop({ required: true })
  name: string

  @Field()
  @prop()
  description: string

  _doc?: any
}

export const EventModel = getModelForClass(Events)
