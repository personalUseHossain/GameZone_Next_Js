import userCollection from '@/models/userModels'
import { connect } from '@/db/db'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export async function POST(req) {
    const { email, password } = await req.json();
    try {
        const findUser = await userCollection.findOne({ email });
        if (!findUser) return NextResponse.json({ error: "Invalid User Data", status: 400 }, { status: 400 });
        const matchPassword = await bcrypt.compare(password, findUser.password)
        if (!matchPassword) return NextResponse.json({ error: "Invalid User Data", status: 401 }, { status: 401 });
        const tokenPayload = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            img: findUser.img || null
        }
        const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET)
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        const response = NextResponse.json({
            message: "Login successful. Redirecting to Home",
            status: 200
        }, {
            status: 200
        });
        response.cookies.set('gamezonetoken', token, {
            // httpOnly: true,
            // expires: expirationDate,
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", status: 500 }, { status: 500 })
    }
}