import { NextRequest, NextResponse } from 'next/server';

import UserRepository from '@/database/repositories/UserRepository';
import { IUserDonorPayload } from '@/types/User';

import JWT from "jsonwebtoken";
import ENV from '@/services/env';

import bcrypt from "bcrypt"
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookiesHandler = await cookies();
    const userRepository = new UserRepository();
    const payload = await req.json() as IUserDonorPayload;
    const user = await userRepository.findByEmail(payload.email);

    if (user && user.email) {
      const comparePassword = await bcrypt.compare(payload.password, user.password);
      if (!comparePassword) return NextResponse.json({ error: "Verifique se o e-mail e a senha estão corretos." }, { status: 404 });

      const token = JWT.sign({ sub: user._id }, ENV.JWT!, {
        expiresIn: "1h"
      });

      cookiesHandler.set("@hubfome-zero:auth-token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60
      })

      cookiesHandler.set("@hubfome-zero:auth-email", JSON.stringify(user.email), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60
      })

      cookiesHandler.set("@hubfome-zero:auth-id", JSON.stringify(user._id), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60
      })

      return NextResponse.json({ user }, { status: 201 });
    }

    throw new Error(`Erro ao autenticar. Verifique se o e-mail e a senha estão corretos.`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
