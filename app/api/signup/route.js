// necessary imports
import userCollection from '@/models/userModels' //user model
import { connect } from '@/db/db' //connet to db
import { NextResponse } from 'next/server'; //response object to send reponse to frontend
import bcrypt from 'bcryptjs'; //bcrypt for hash password

connect(); // connecting to db

export async function POST(req) {
    const { username, email, password } = await req.json(); // getting necessary information to save
    try {
        const findUser = await userCollection.findOne({ email }); // checing if user exist
        if (findUser) {
            return NextResponse.json({ error: "User already Exist", status: 409 }, { status: 409 }) //if user exist then return
        }
        const hashedPassword = await bcrypt.hash(password, 10) //hash password
        const newUser = new userCollection({
            name: username,
            email: email,
            password: hashedPassword
        }) // create user
        const result = await newUser.save(); //save user
        return NextResponse.json({ message: "User Registration Success. Navigating to login page", status: 201 }, { status: 201 }) //send response 
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error, Please try again later", error, status: 500 }, { status: 500 }) // listen for catch/error
    }
}
