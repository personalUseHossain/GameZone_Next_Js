"use client";
import React, { useContext, useEffect, useState } from "react";
import "@/public/CSS/PopularGame.css";
import Image from "next/image";

import game from "@/public/images/game.jpg";
import nitendoLogo from "@/public/images/nitendologo.png";
import sega from "@/public/images/sega logo.png";
import xbox from "@/public/images/xbox logo.png";
import playstation from "@/public/images/playstation logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
      <div className="popular_games">
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Popular Games
        </h1>
        {/* nitendo */}
        <LazyLoadImage
          effect="blur"
          src={nitendoLogo.src}
          height={70}
          width={70}
          className="logo"
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            {games
              .filter((game) => game.category === "nitendo")
              .map((game) => (
                <Link href={`/game/${game._id}`}>
                  <div className="game" key={game._id}>
                    <LazyLoadImage
                      effect="blur"
                      src={`/uploads/${game.img[0]}`}
                      height={150}
                      width={150}
                      alt="404"
                    />
                    <h4>{game.name}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* sega */}
        <LazyLoadImage
          effect="blur"
          className="logo"
          src={sega.src}
          height={70}
          width={70}
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            {games
              .filter((game) => game.category === "sega")
              .map((game) => (
                <Link href={`/game/${game._id}`}>
                  <div className="game" key={game._id}>
                    <LazyLoadImage
                      effect="blur"
                      src={`/uploads/${game.img[0]}`}
                      height={150}
                      width={150}
                      alt="404"
                    />
                    <h4>{game.name}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* xbox */}
        <LazyLoadImage
          effect="blur"
          className="logo"
          src={xbox.src}
          height={70}
          width={70}
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            {games
              .filter((game) => game.category === "xbox")
              .map((game) => (
                <Link href={`/game/${game._id}`}>
                  <div className="game" key={game._id}>
                    <LazyLoadImage
                      effect="blur"
                      src={`/uploads/${game.img[0]}`}
                      height={150}
                      width={150}
                      alt="404"
                    />
                    <h4>{game.name}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* playstation */}
        <LazyLoadImage
          effect="blur"
          className="logo"
          src={playstation.src}
          height={70}
          width={70}
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="sega-game-container game-container">
              {games
                .filter((game) => game.category === "playstation")
                .map((game) => (
                  <Link href={`/game/${game._id}`}>
                    <div className="game" key={game._id}>
                      <LazyLoadImage
                        effect="blur"
                        src={"/uploads/" + game.img[0]}
                        height={150}
                        width={150}
                        alt="404"
                      />
                      <h4>{game.name}</h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <h1 style={{ marginBottom: "2rem" }}>Others</h1>
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="sega-game-container game-container">
              {games
                .filter(
                  (game) =>
                    game.category !== "playstation" &&
                    game.category !== "nitendo" &&
                    game.category !== "xbox" &&
                    game.category !== "sega"
                )
                .map((game) => (
                  <Link href={`/game/${game._id}`}>
                    <div className="game" key={game._id}>
                      <LazyLoadImage
                        effect="blur"
                        src={"/uploads/" + game.img[0]}
                        height={150}
                        width={150}
                        alt="404"
                      />
                      <h4>{game.name}</h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
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
