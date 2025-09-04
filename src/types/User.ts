import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  cpf: string;
  name: string;
  email: string;
  password: string;
  role: number;
  created_at: Date;
}

export interface IParsedUser {
  _id: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
  role: number;
  created_at: Date;
}

export interface IUserDonorPayload {
  cpf: string;
  name: string;
  email: string;
  password: string;
  role: 1;
  created_at: Date;
}



