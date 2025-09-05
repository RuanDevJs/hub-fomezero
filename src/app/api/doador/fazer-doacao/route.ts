import { TypeDonationPayload } from "@/types/Donation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json() as TypeDonationPayload;


}
