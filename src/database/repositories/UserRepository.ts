import ENV from "@/services/env";
import DatabaseClient from "../MongoClient";

import { IUser, IUserDonorPayload } from "@/types/User";
import { MongoError } from "mongodb";

import bcrypt from "bcrypt"

export default class UserRepository {
  async initDatabase() {
    const client = await DatabaseClient();
    const database = client?.db(ENV.MONGO_DATABASE);

    return { client, database }
  }

  async findAll() {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        return database.collection<IUser>("users").find().toArray();
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao fazer as listagem das famílias no banco de dados!");
    }
  }

  async findByEmail(email: string) {
    const { client, database } = await this.initDatabase();
    try {
      if (client && database) {
        return await database.collection<IUser>("users").findOne({ email });
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao fazer as listagem das famílias no banco de dados!");
    }
  }

  async save(payload: IUserDonorPayload) {
    const { client, database } = await this.initDatabase();
    const cryptedPassword = await bcrypt.hash(payload.password, 10);

    try {
      if (client && database) {
        const newDonor = await database.collection<IUserDonorPayload>("users").insertOne({ ...payload, password: cryptedPassword });
        console.log("Uma doador acaba de ser registrado no banco de dados", { id: newDonor.insertedId.toString(), ...payload });

        return newDonor.insertedId.toString();
      }
    } catch (error) {
      if (error instanceof MongoError) console.error("Erro ao cadastrar família no banco de dados!", error)
    }
  }
}
