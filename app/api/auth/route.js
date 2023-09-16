import jwt from 'jsonwebtoken'; // to sign, verify, decode jwt
import { NextResponse } from 'next/server';

export async function POST(req) {
    const token = await req.json()
    if (token) {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify) return NextResponse.json({ success: true });
        return NextResponse.json({ success: false })
    }
    return NextResponse.json({ success: false })
}