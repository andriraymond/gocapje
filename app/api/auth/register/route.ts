import { prisma } from "@/lib/prisma";
import { hashPassword } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
    const { name, email, password } = await req.json();

    const existingEmail = await prisma.user.findUnique({ 
        where: { email }
    });

    if (existingEmail) {
        return NextResponse.json({ error: 'Email already exists'}, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: { name, email, password: hashed}
    });


    return NextResponse.json ({ message: "User registered", user: { id: user.id, email: user.email, },
    });

} catch(err: any) {
    console.error('❌ Internal error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: err.message },
      { status: 500 }
    );
}}