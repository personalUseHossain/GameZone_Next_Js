"use client"; // A comment indicating the usage of the "client" module

import React, { useContext, useEffect, useState } from "react";
import "@/public/CSS/games.css"; // Importing a CSS file

import Image from "next/image";
import Link from "next/link";
import { MyContext } from "@/app/layout"; // Importing context from the layout component

import { useSearchParams } from "next/navigation"; // Importing a hook for handling URL search parameters

// Importing LazyLoadImage component and its associated CSS effect
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PopularGame() {
  const { setLoading } = useContext(MyContext); // Getting the setLoading function from the context

  const [games, SetGames] = useState([]); // Initializing state for games data

  async function fetchData() {
    setLoading(true); // Setting loading status to true
    const req = await fetch(
      "https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/api/games"
    ); // Fetching data from the "api/games" endpoint
    const res = await req.json(); // Parsing the response as JSON
    SetGames(res.data); // Updating the games state with fetched data
    setLoading(false); // Setting loading status to false when done
  }

  async function searchFetchData() {
    const req = await fetch(
      `https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/api/games?search=${search_keyword}`
    ); // Fetching data with a search keyword
    const res = await req.json(); // Parsing the response as JSON
    SetGames(res.data); // Updating the games state with search results
    console.log(res.data); // Logging the search results to the console
  }

  const searchParam = useSearchParams(); // Using the useSearchParams hook to get URL search parameters
  const search_keyword = searchParam.get("search"); // Extracting the "search" parameter from the URL

  useEffect(() => {
    if (search_keyword) {
      searchFetchData(); // Fetch data based on the search keyword if it exists
    } else {
      fetchData(); // Fetch data when there is no search keyword
    }
  }, [search_keyword]); // Running the effect when the search_keyword changes

  console.log(games); // Logging the games data to the console

  return (
    <>
      <div className="background-game-section">
        <div className="games-container">
          {games !== "[]" ? ( // Checking if games data is empty
            <>
              {games.map(
                (
                  game // Mapping through games and rendering them as links
                ) => (
                  <Link href={`/game/${game._id}`} key={game._id}>
                    <div className="game">
                      <Image
                        effect="blur"
                        src={"/uploads/" + game.img[0]}
                        height={150}
                        width={150}
                        alt="404"
                      />
                      <h4>{game.name.slice(0, 16) + "..."}</h4>
                    </div>
                  </Link>
                )
              )}
            </>
          ) : (
            <>
              <h1
                style={{
                  color: "white",
                  margin: "5rem auto",
                  width: "95vw",
                  textAlign: "center",
                }}
              >
                No Games Found
              </h1>
            </>
          )}
          <br />
        </div>
        <button
          style={{
            padding: "7px",
            display: "block",
            margin: "0 auto",
            borderRadius: "5px",
            background: "skyblue",
          }}
        >
          Load more
        </button>
      </div>
    </>
  );
}
