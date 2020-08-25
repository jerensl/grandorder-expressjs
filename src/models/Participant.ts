import { prop, getModelForClass } from "@typegoose/typegoose"
import { ObjectType, Field, ID } from "type-graphql"
import { Events } from "./Events"
import { Ref } from "./types"
import { __Type } from "graphql"

@ObjectType({ description: "Event" })
export class Participant {
  @Field(() => ID)
  id: string

  @Field()
  @prop()
  name: string

  @Field()
  @prop()
  certificateID: string

  @Field()
  @prop()
  role: string

  @Field()
  @prop()
  description: string

  @Field((_type) => String)
  @prop({ ref: Events, required: true })
  event_id: Ref<Events>
}

export const ParticipantModel = getModelForClass(Participant)
