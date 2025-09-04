import { ObjectId } from "mongodb";

export interface IAddress {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  region: string;
  complement: string;
}

export interface IFamily {
  _id: ObjectId;
  name: string;
  description: string;
  total_donations: number;
  address: IAddress;
  created_at: Date;
  picture_url: string;
}

export type TypeFamilyPayload = Omit<IFamily, "_id">;
