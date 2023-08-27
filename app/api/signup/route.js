import userCollection from '@/models/userModels'
import { connect } from '@/db/db'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect();

export async function POST(req) {
    const { username, email, password } = await req.json();
    try {
        const findUser = await userCollection.findOne({ email });
        if (findUser) {
            return NextResponse.json({ error: "User already Exist", status: 409 }, { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userCollection({
            name: username,
            email: email,
            password: hashedPassword
        })
        const result = await newUser.save();
        return NextResponse.json({ message: "User Registration Success. Navigating to login page", status: 201 }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error, Please try again later", error, status: 500 }, { status: 500 })
    }
}
