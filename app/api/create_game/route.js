import gameCollection from "@/models/gameModel";
import { connect } from "@/db/db";
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

connect();

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.v2.config({
    cloud_name: 'dndev4rnw',
    api_key: '957727982329516',
    api_secret: '4DKAe7Xkywd8qife4prtnr_qZks',
});
async function savePhotoToCloudinary(images) {
    const imageArrayName = [];

    await Promise.all(images.map(async (image) => {
        const data = await image.arrayBuffer();
        const buffer = Buffer.from(data);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'gamezone', // Specify your desired folder in Cloudinary
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        imageArrayName.push(result.secure_url);
                        resolve();
                    }
                }
            );
            const imageStream = cloudinary.v2.uploader.upload_stream();
            imageStream.end(buffer);
        });

        await result; // Wait for the upload to complete
    }));


    return imageArrayName;
}


export async function POST(req) {
    const data = await req.formData();

    const name = data.get('name');
    const link = data.get('link');
    const details = data.get('details');
    const category = data.get('categroy');
    const keyword = data.get('keyword');
    const images = data.getAll('files');

    if (!data) {
        return NextResponse.json({ message: "Request body is empty or malformed" }, 400);
    }

    try {
        const imageUrls = await savePhotoToCloudinary(images);

        const newGame = new gameCollection({
            name,
            details,
            downloadlink: link,
            category,
            img: imageUrls,
            keyword,
        });

        await newGame.save();
        return NextResponse.json({ result: newGame, message: "successfully new game added" });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "something went wrong", err });
    }
}
