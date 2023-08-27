import React from "react";
import "@/public/CSS/PopularGame.css";
import Image from "next/image";

import game from "@/public/images/game.jpg";
import nitendoLogo from "@/public/images/nitendologo.png";
import sega from "@/public/images/sega logo.png";
import xbox from "@/public/images/xbox logo.png";
import playstation from "@/public/images/playstation logo.png";

export default function PopularGame() {
  return (
    <>
      <div className="popular_games">
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Popular Games
        </h1>
        {/* nitendo */}
        <Image
          src={nitendoLogo}
          height={70}
          width={70}
          className="logo"
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="game">
              <Image src={game} height={150} width={150} alt="404" />
              <h4>Animal Crossing</h4>
            </div>
          </div>
        </div>
        {/* sega */}
        <Image className="logo" src={sega} height={70} width={70} alt="404" />
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="game">
              <Image src={game} height={150} width={150} alt="404" />
              <h4>Animal Crossing</h4>
            </div>
          </div>
        </div>
        {/* xbox */}
        <Image className="logo" src={xbox} height={70} width={70} alt="404" />
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="game">
              <Image src={game} height={150} width={150} alt="404" />
              <h4>Animal Crossing</h4>
            </div>
          </div>
        </div>
        {/* playstation */}
        <Image
          className="logo"
          src={playstation}
          height={70}
          width={70}
          alt="404"
        />
        <div className="game-section">
          <div className="sega-game-container game-container">
            <div className="game">
              <Image src={game} height={150} width={150} alt="404" />
              <h4>Animal Crossing</h4>
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
