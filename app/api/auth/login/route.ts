// import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user) {
        // return NextResponse.json({ error: 'invalid credentials'}, {status: 401});
        return new Response(JSON.stringify({ error: 'Wrong password' }), { status: 401 });
    }
    
    const isValid = await verifyPassword(password, user.password);
    if(!isValid) {
        // return NextResponse.json({ error: 'password invalid'});
        return new Response(JSON.stringify({ error: 'Wrong password' }), { status: 401 });
    }

    const token = generateToken({ userId: user.id, email : user.email});

    // return NextResponse.json({
    //     message: 'Login successfully',
    //     user: {
    //       id: user.id,
    //       email: user.email,
    //       token,
    //     }
    //   });
    return new Response(JSON.stringify({ message: 'Login success', user }), { status: 200 });      
}