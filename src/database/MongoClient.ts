import { MongoClient, MongoClientOptions } from "mongodb";
import ENV from "@/services/env";

export default async function DatabaseClient(options?: MongoClientOptions): Promise<MongoClient | undefined> {
  try {
    if (!ENV.DATABSE_URI || ENV.DATABSE_URI.includes("undefined")) throw new Error("Por favor adicione a URI para se conectar a database!");

    const client = new MongoClient(ENV.DATABSE_URI, options);
    const database = await client.connect();

    console.log("Conectado ao banco de dados!")
    return database;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Não foi possível se conectar com o banco de dados")
      console.error(error);
    }
  }
}
