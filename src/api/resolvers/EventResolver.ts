import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql"
import { EventsInput } from "../../models/types/event-input"
import { Events, EventModel } from "../../models/Events"
import { Participant, ParticipantModel } from "../../models/Participant"

@Resolver((_of) => Events)
export class EventResolver {
  @Query(() => [Events])
  async getAllEvent(): Promise<Events[]> {
    return await EventModel.find()
  }

  @Mutation(() => Events)
  async addEvent(
    @Arg("data") { name, description }: EventsInput,
  ): Promise<Events> {
    const event = (
      await EventModel.create({
        name,
        description,
      })
    ).save()
    return event
  }

  @FieldResolver((_type) => [Participant])
  async participant(@Root() event: Events): Promise<Participant[]> {
    return await ParticipantModel.find({ event_id: event._doc._id })
  }
}
