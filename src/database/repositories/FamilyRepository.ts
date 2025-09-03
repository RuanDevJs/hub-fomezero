import ENV from "@/services/env";
import DatabaseClient from "../MongoClient";

import { MongoError } from "mongodb";
import { TypeFamilyPayload } from "@/types/Family";

export default class FamilyRepository {
  async initDatabase() {
    const client = await DatabaseClient();
    const database = client?.db(ENV.MONGO_DATABASE);

    return { client, database }
  }

  async findAll() {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        return database.collection<TypeFamilyPayload>("familys").find().toArray();
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao fazer as listagem das famílias no banco de dados!");
    }
  }

  async save(payload: TypeFamilyPayload) {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        const newFamily = await database.collection<TypeFamilyPayload>("familys").insertOne({ ...payload });
        console.log("Uma nova família acaba de ser registrada no banco de dados", { id: newFamily.insertedId.toString(), ...payload });

        return newFamily.insertedId.toString();
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao cadastrar família no banco de dados!", error)
    }
  }
}
