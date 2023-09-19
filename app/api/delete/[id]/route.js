import gameCollection from "@/models/gameModel";
import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";

connect()

export async function GET(req) {
    try {
        const urlPath = req.nextUrl.pathname;
        const parts = urlPath.split("/");
        const id = parts[parts.length - 1];
        const gameinfo = await gameCollection.findOne({ _id: id });
        const gameImage = gameinfo.img;
        gameImage.forEach((imageName) => {
            fs.unlink(path.join(process.cwd(), '/public/uploads/', imageName))
        })
        await gameCollection.findByIdAndDelete({ _id: id })
        return NextResponse.json({ message: "Game Deleted", status: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed To Delete", status: false })
    }
}