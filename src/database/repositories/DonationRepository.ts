import ENV from "@/services/env";
import DatabaseClient from "../MongoClient";

import { MongoError, ObjectId } from "mongodb";
import { IDonation, TypeDonationPayload, TypeSaveDonation } from "@/types/Donation";

export default class DonationRepository {
  async initDatabase() {
    const client = await DatabaseClient();
    const database = client?.db(ENV.MONGO_DATABASE);

    return { client, database }
  }

  async findAll() {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        return await (await database.collection<IDonation>("donations")
          .aggregate([
            {
              $lookup: {
                from: "familys",
                localField: "family_id",
                foreignField: "_id",
                as: "family",
              }
            },
            {
              $unwind: "$family"
            },

          ])
          .toArray())
          .map(
            oldValue => ({ ...oldValue, _id: oldValue._id.toString(), family_id: oldValue.family_id.toString(), user_id: oldValue.user_id.toString() })
          );
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao fazer as listagem das doações no banco de dados!");
    }
  }

  async save(payload: TypeDonationPayload) {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        const newDonation = await database.collection<TypeSaveDonation>("donations")
          .insertOne({ ...payload, created_at: new Date(), status: "INICIADA", family_id: new ObjectId(payload.family_id), user_id: new ObjectId(payload.user_id) });
        console.log("Uma nova doação acaba de ser registrada no banco de dados", { id: newDonation.insertedId.toString(), ...payload });

        return newDonation.insertedId.toString();
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao cadastrar doação no banco de dados!", error)
    }
  }
}
