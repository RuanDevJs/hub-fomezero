import { NextRequest, NextResponse } from 'next/server';

import UserRepository from '@/database/repositories/UserRepository';
import { IUserDonorPayload } from '@/types/User';

import JWT from "jsonwebtoken";
import ENV from '@/services/env';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookiesHandler = await cookies();
    const userRepository = new UserRepository();
    const payload = await req.json() as IUserDonorPayload;
    const user = await userRepository.findByEmail(payload.email);

    if (user && user.email) throw new Error(`Não foi possível cadastrar o doador - ${user.email} já está em uso!`)

    const insertedId = await userRepository.save(payload);

    if (insertedId !== undefined) {
      const token = JWT.sign({ sub: insertedId }, ENV.JWT!, {
        expiresIn: "1h"
      });

      cookiesHandler.set("@hubfome-zero:auth-token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60
      })

      return NextResponse.json({ created: true, }, { status: 201 });
    }

    throw new Error("Não foi possível fazer o registro do Doador!")
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
