import jwt from 'jsonwebtoken'; // Importing the 'jsonwebtoken' library for JWT operations
import { NextResponse } from 'next/server';

export async function POST(req) {
    const token = await req.json(); // Parsing the incoming request JSON data as 'token'

    if (token) { // Checking if a token was provided in the request
        const verify = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token using the JWT_SECRET from environment variables

        if (verify) { // If the token is successfully verified
            return NextResponse.json({ success: true }); // Responding with success
        } else {
            return NextResponse.json({ success: false }); // Responding with failure due to invalid token
        }
    } else {
        return NextResponse.json({ success: false }); // Responding with failure if no token was provided
    }
}
