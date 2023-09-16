//necessary imports
import userCollection from '@/models/userModels' //user model
import { connect } from '@/db/db' //db connetion
import { NextResponse } from 'next/server'; // res object to send response to frontend
import bcrypt from 'bcryptjs';  //for compare password
import jwt from 'jsonwebtoken'; // for sign cookie

connect() //conneting to db

export async function POST(req) {
    const { email, password } = await req.json(); //getting email and password from req object
    try {
        //checking if user exist or not
        const findUser = await userCollection.findOne({ email });
        if (!findUser) return NextResponse.json({ error: "Invalid User Data", status: 400 }, { status: 400 }); //if user not exist then return
        const matchPassword = await bcrypt.compare(password, findUser.password) //check password is match with bcrypt
        if (!matchPassword) return NextResponse.json({ error: "Invalid User Data", status: 401 }, { status: 401 }); // if password didn't match then return
        const tokenPayload = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            img: findUser.img || null
        } // cookie payload

        if (findUser._doc && findUser._doc.isAdmin) {
            tokenPayload.isAdmin = true;
        }
        const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET)  //sign cookie with jsonwebtoken
        //expires date of cookie
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        //creating response and attach the cookie with it
        const response = NextResponse.json({
            message: "Login successful. Redirecting to Home",
            status: 200
        }, {
            status: 200
        });

        //cookie
        response.cookies.set('gamezonetoken', token, {
            expires: expirationDate,
        })
        return response; //send response
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", status: 500, error }, { status: 500 }) //catch for error
    }
}