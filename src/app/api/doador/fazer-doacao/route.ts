import { TypeDonationPayload } from "@/types/Donation";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = await request.json() as TypeDonationPayload;


    return NextResponse.json({ created: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível registrar a doação no banco de dados" }, { status: 500 });
  }
  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: 'ruanvelpidio@hotmail.com',
  //   subject: 'Hello World, Ruan Vitor',
  //   html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  // });


}
