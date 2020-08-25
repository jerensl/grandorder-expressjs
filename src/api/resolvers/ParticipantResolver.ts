import { Resolver, Mutation, Arg } from "type-graphql"
import { Participant, ParticipantModel } from "../../models/Participant"
import { ParticipantInput } from "../../models/types/participant-input"

@Resolver()
export class ParticipantResolver {
  @Mutation(() => Participant)
  async addParticipant(
    @Arg("data")
    { name, description, certificateID, event_id, role }: ParticipantInput,
  ): Promise<Participant> {
    const participant = (
      await ParticipantModel.create({
        name,
        description,
        certificateID,
        event_id,
        role,
      })
    ).save()
    return participant
  }

  @Mutation(() => Boolean)
  async removeParticipant(@Arg("id") id: string): Promise<boolean> {
    // dont forget to change id to ObjectID using ObjectID from mongodb
    await ParticipantModel.deleteOne({ id })
    return true
  }
}
