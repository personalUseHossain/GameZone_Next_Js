import gameCollection from "@/models/gameModel";  //game model
import { connect } from "@/db/db"; // function to connect to database
import { NextResponse } from 'next/server'; // res object to send response to frontend
import path from 'path'; // to get the image save directory
import fs from 'fs/promises' // to save file to local storage

connect() // connecting to database


async function savePhoto(images) {  // save image to local direcotry function
    //don't know what is going on here
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
    const data = await req.formData(); //getting the formData

    //extracting data from formData
    const name = data.get('name')
    const link = data.get('link')
    const details = data.get('details')
    const category = data.get('categroy')
    const images = data.getAll('files')

    if (!data) {
        return NextResponse.json({ message: "Request body is empty or malformed" }, 400); // if no image attached with the request payload then return;
    }

    try {
        const newImage = await savePhoto(images) //calling the save image function
        const imageName = []; //array to save image name
        images.forEach((image) => imageName.push(image.name)) //saving image name to imageName array

        //creating new document
        const newGame = new gameCollection({
            name,
            details,
            downloadlink: link,
            category,
            img: imageName
        })
        await newGame.save(); //saving document to database
        return NextResponse.json({ result: newGame, message: "successfully new game added" }) //sending response to frontend
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "something went wrong", err }) //sending error
    }
}


