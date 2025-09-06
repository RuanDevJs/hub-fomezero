import { ObjectId } from "mongodb";
import { IFamily } from "./Family";

export interface IDonation {
  _id: ObjectId;
  message: string;
  price: number;
  user_id: ObjectId;
  family_id: ObjectId;
  status: "INICIADA" | "EM ROTA DE ENTREGA" | "CONCLUÍDA";
  created_at: Date;
}

export interface IParsedDonation {
  _id: string;
  message: string;
  price: number;
  user_id: string;
  family_id: string;
  status: "INICIADA" | "EM ROTA DE ENTREGA" | "CONCLUÍDA";
  created_at: Date;
}

export interface IAgregateDonation extends IParsedDonation {
  family: IFamily;
}

export type TypeDonationPayload = Omit<IParsedDonation, "_id">;

export type TypeSaveDonation = Omit<IDonation, "_id">;
