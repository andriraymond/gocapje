// app/api/photos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const photos = await prisma.photo.findMany({
    select: {
      
      // name: true,
      path: true,
    },
  });

  return NextResponse.json(photos);
}
