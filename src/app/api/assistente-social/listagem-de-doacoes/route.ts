import DonationRepository from '@/database/repositories/DonationRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const donationRepository = new DonationRepository();

    const rows = await donationRepository.findAll();
    if (rows !== undefined && rows.length) return NextResponse.json({ data: rows, }, { status: 200 });

    return NextResponse.json({ error: 404 }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
