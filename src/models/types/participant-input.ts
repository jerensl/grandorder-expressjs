import { InputType, Field } from "type-graphql"
import { Length } from "class-validator"
import { Participant } from "../Participant"
import { ObjectId } from "mongodb"

@InputType()
export class ParticipantInput implements Partial<Participant> {
  @Field()
  name: string

  @Field()
  certificateID: string

  @Field()
  @Length(1, 255)
  description: string

  @Field()
  role: string

  @Field(() => String)
  event_id: ObjectId
}
