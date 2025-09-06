import EmailTemplate from "@/components/EmailTemplate";
import DonationRepository from "@/database/repositories/DonationRepository";
import { TypeDonationPayload } from "@/types/Donation";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const donationRepository = new DonationRepository();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = await request.json() as TypeDonationPayload;

    await donationRepository.save(payload);

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["ruanvelpidio@hotmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ name: "Ruan Vitor" }),
    });

    return NextResponse.json({ created: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível registrar a doação no banco de dados" }, { status: 500 });
  }

}

// import { Resend } from "resend";
// import { render } from "@react-email/render";
// import EmailTemplate from "@/components/EmailTemplate";

// export async function POST() {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     // Renderiza o JSX em HTML
//     // const html = await render(EmailTemplate({ name: "John" }));

//     const data = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: ["ruanelpidio07@gmail.com"],
//       subject: "Hello world",
//       // html: "Meu teste",
//       react: EmailTemplate({ name: "John" }),
//     });

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error }, { status: 500 });
//   }
// }
