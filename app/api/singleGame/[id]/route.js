import { connect } from "@/db/db";
import gameCollection from "@/models/gameModel";

import { NextResponse } from "next/server";

connect();

export async function GET(req) {
    const urlPath = req.nextUrl.pathname;
    const parts = urlPath.split("/");
    const id = parts[parts.length - 1];

    const gameInfo = await gameCollection.findOne({ _id: id });

    return NextResponse.json({ status: true, result: gameInfo })
}