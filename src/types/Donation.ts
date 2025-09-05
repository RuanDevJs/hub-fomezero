import { ObjectId } from "mongodb";

export interface IDonation {
  _id: ObjectId;
  message: string;
  price: number;
  user_id: ObjectId;
  family_id: ObjectId;
  status: "INICIADA" | "EM ROTA DE ENTREGA" | "CONCLUÍDA";
  created_at: Date;
}

export type TypeDonationPayload = Omit<IDonation, "_id">;
