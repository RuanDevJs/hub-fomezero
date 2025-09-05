import UserRepository from "@/database/repositories/UserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

export async function POST(request: NextRequest) {
  try {
    const cookiesHanlder = await cookies();
    const usersRepository = new UserRepository();
    const pinata = new PinataSDK({
      pinataJwt: `${process.env.PINATA_API_JWT}`,
      pinataGateway: `${process.env.PINATA_GATEWAY}`
    })

    const formData = await request.formData();
    if (formData) {
      const file: File | null = formData.get("file") as File;

      const userEmail = cookiesHanlder.get("@hubfome-zero:auth-email")?.value;
      const uploadData = await pinata.upload.public.file(file).name(JSON.parse(userEmail!));

      const PICTURE_URl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadData.cid}`;
      await usersRepository.addPictureUrl(request.nextUrl.searchParams.get("user_id")!, PICTURE_URl);
      return NextResponse.json({ picture_url: "PICTURE_URl" })
    }

    return NextResponse.json({ message: "Erro ao fazer upload - foto de perfil não fornecida" }, { status: 400 });
  } catch (error) {
    console.error("Erro ao fazer o upload da foto de perfil", error);
    return NextResponse.json({ message: "Não foi possível fazer o upload da foto de perfil" }, { status: 500 });
  }
}
