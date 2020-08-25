import { InputType, Field } from "type-graphql"
import { Events } from "../Events"

@InputType()
export class EventsInput implements Partial<Events> {
  @Field()
  name: string

  @Field()
  description: string
}
