import FamilyRepository from "@/database/repositories/FamilyRepository";
import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

export async function POST(request: NextRequest) {
  const familyRepository = new FamilyRepository();
  const pinata = new PinataSDK({
    pinataJwt: `${process.env.PINATA_API_JWT}`,
    pinataGateway: `${process.env.PINATA_GATEWAY}`
  })

  const formData = await request.formData();
  const file: File | null = formData.get("file") as File;

  const uploadData = await pinata.upload.public.file(file, {
    groupId: request.nextUrl.searchParams.get("group_id")!,
  });

  const PICTURE_URl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadData.cid}`;
  await familyRepository.addPictureUrl(request.nextUrl.searchParams.get("family_id")!, PICTURE_URl)


  return NextResponse.json({ picture_url: PICTURE_URl })
}
