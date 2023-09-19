"use client";
import React, { useContext, useEffect, useState } from "react";
import "@/public/CSS/games.css";
import Image from "next/image";

import Link from "next/link";
import { MyContext } from "@/app/layout";

//image lazy loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PopularGame() {
  const { setLoading } = useContext(MyContext); //getting data for loading status
  const [games, SetGames] = useState([]);
  async function fetchData() {
    setLoading(true);
    const req = await fetch("/api/games");
    const res = await req.json();
    SetGames(res.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="background-game-section">
        <div className="games-container">
          {games.map((game) => (
            <Link href={`/game/${game._id}`}>
              <div className="game" key={game._id}>
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
          ))}
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
