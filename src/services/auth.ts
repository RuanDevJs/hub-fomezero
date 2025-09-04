import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ENV from "./env";
import UserRepository from "@/database/repositories/UserRepository";

export default async function authenticateUser() {
  const cookiesHandler = await cookies();
  const userRepository = new UserRepository();
  const token = cookiesHandler.get("@hubfome-zero:auth-token");
  const email = cookiesHandler.get("@hubfome-zero:auth-email");

  if (token?.value && email?.value) {
    const compareToken = jwt.verify(token.value, ENV.JWT!);

    if (!compareToken) throw new Error("Não foi possível autenticar usuário - token expirado!");

    const user = await (await userRepository.findByEmail(JSON.parse(email.value)));
    if (!user || !user.email) throw new Error("Não foi possível autenticar usuário - usuário não encontrado");

    return {
      ...user,
      _id: user._id.toString(),
    };
  }
  throw new Error("Não foi possível autenticar usuário - token inválido expirado!");
}
