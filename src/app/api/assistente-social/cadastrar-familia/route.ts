import FamilyRepository from '@/database/repositories/FamilyRepository';
import { TypeFamilyPayload } from '@/types/Family';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const familyRepository = new FamilyRepository();
    const payload = await req.json() as TypeFamilyPayload;

    const insertedId = await familyRepository.save(payload);
    if (insertedId !== undefined) return NextResponse.json({ created: true, }, { status: 201 });

    return NextResponse.json({ created: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
