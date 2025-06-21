import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json({ error: 'Wrong Email' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
        return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return NextResponse.json({
        message: 'Login successfully',
        user: {
            id: user.id,
            email: user.email,
            token,
        }
    });
}