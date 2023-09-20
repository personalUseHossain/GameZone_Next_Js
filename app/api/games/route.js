import { connect } from "@/db/db";
import gameCollection from "@/models/gameModel";
import { NextResponse } from "next/server";

connect()

export async function GET(req) {
    const searchparam = req.nextUrl.searchParams.get('search');
    if (searchparam) {
        // Create a regular expression pattern to search for the keyword
        const keywordRegex = new RegExp(searchparam, 'i'); // 'i' makes it case-insensitive

        // Use $regex to perform a case-insensitive search on the "keyword" field
        const games = await gameCollection.find(
            { keyword: { $regex: keywordRegex } },
            { keyword: 0 } // Exclude the "keyword" field from the results
        );
        return NextResponse.json({ message: 'success', data: games });
    }
    let games = await gameCollection.find({}, { keyword: 0 }); // Exclude the "keyword" field
    return NextResponse.json({ message: 'success', data: games });
}

