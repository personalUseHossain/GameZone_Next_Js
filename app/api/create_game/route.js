import gameCollection from "@/models/gameModel";
import { connect } from "@/db/db";
import { NextResponse } from 'next/server'; // res object to send response to frontend
import path from 'path';
import fs from 'fs/promises'
import { compareSync } from "bcryptjs";

connect()


async function savePhoto(images) {
    const multipleBuffer = images.map(image => {
        image.arrayBuffer()
            .then(data => {
                const buffer = Buffer.from(data);
                const uploadDir = path.join(process.cwd(), 'public/uploads', `/${image.name}`);
                fs.writeFile(uploadDir, buffer)
            })
    })
}


export async function POST(req) {
    const data = await req.formData();
    const name = data.get('name')
    const link = data.get('link')
    const details = data.get('details')
    const category = data.get('categroy')
    const images = data.getAll('files')
    if (!data) {
        return NextResponse.json({ message: "Request body is empty or malformed" }, 400);
    }

    try {
        const newImage = await savePhoto(images)
        const imageName = [];
        images.forEach((image) => imageName.push(image.name))

        const newGame = new gameCollection({
            name,
            details,
            downloadlink: link,
            category,
            img: imageName
        })
        await newGame.save();
        return NextResponse.json({ result: newGame, message: "successfully new game added" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "something went wrong", err })
    }


    return NextResponse.json({ message: "success" });

}


