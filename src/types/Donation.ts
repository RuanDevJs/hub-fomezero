import { ObjectId } from "mongodb";

export interface IDonation {
  _id: ObjectId;
  message: string;
  price: string;
  user_donation: ObjectId;
  family_donation: ObjectId;
  status: "INICIADA" | "EM ROTA DE ENTREGA" | "CONCLUÍDA";
  created_at: Date;
}

export type TypeDonationPayload = Omit<IDonation, "_id">;
