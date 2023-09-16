import gameCollection from "@/models/gameModel";  //game model
import { connect } from "@/db/db"; // function to connect to database
import { NextResponse } from 'next/server'; // res object to send response to frontend
import path from 'path'; // to get the image save directory
import fs from 'fs/promises' // to save file to local storage

connect() // connecting to database


async function savePhoto(images) {
    const imageArrayName = []; // Array to store image names
    await Promise.all(images.map(async (image) => {
        const data = await image.arrayBuffer();
        const buffer = Buffer.from(data);
        const imageName = Date.now() + image.name;
        const uploadDir = path.join(process.cwd(), 'public/uploads', imageName);
        await fs.writeFile(uploadDir, buffer);
        imageArrayName.push(imageName);
    }));
    return imageArrayName;
}

function deleteImageByName(imageName) {
    // const imagePath = `path/to/your/image/directory/${imageName}`;
    const imagePath = path.join(process.cwd(), `public/uploads/${imageName}`)

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Error deleting image ${imageName}:`, err);
        } else {
            console.log(`Image ${imageName} deleted successfully.`);
        }
    });
}




export async function POST(req) {
    const data = await req.formData(); //getting the formData

    //extracting data from formData
    const id = data.get('id')
    const name = data.get('name')
    const link = data.get('link')
    const details = data.get('details')
    const category = data.get('categroy')
    const images = data.getAll('files')
    const prevImage = data.get('prevImage')

    if (!data) {
        return NextResponse.json({ message: "Request body is empty or malformed" }, 400); // if no image attached with the request payload then return;
    }

    try {
        const prevImageArray = prevImage.split(',').map((imageName) => imageName.trim());

        prevImageArray.forEach((name) => deleteImageByName(name));
        const imageName = await savePhoto(images);

        // Update the document and retrieve specific properties
        const updatedGame = await gameCollection.findByIdAndUpdate(
            { _id: id },
            {
                name,
                details,
                downloadlink: link,
                category,
                img: imageName
            }
        );

        // Extract specific properties for the response
        const responseGame = {
            _id: updatedGame._id,
            name: updatedGame.name,
            // Add other properties as needed
        };

        return NextResponse.json({ result: responseGame, message: "successfully new game added" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "something went wrong", err });
    }

}


