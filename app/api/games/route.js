import { connect } from "@/db/db"
import gameCollection from "@/models/gameModel";
import { NextResponse } from "next/server";

connect()

export async function GET() {
    const games = await gameCollection.find();
    return NextResponse.json({ message: 'success', data: games });
}