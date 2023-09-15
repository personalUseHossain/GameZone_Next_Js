"use client";
import React, { useEffect, useState } from "react";
import "@/public/CSS/Dashboard/Admin_game.css";
import SingleGame from "@/components/SingleGame";
import Link from "next/link";

export default function page() {
  const [games, setGames] = useState([]);
  async function fetchData() {
    const response = await fetch("/api/games");
    const data = await response.json();
    setGames(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(games);
  return (
    <div className="admin-game">
      <div className="admin-game-nav">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>

      <>
        <h1 style={{ marginBottom: "2rem" }}>All Games</h1>
        <div className="game-container">
          <SingleGame games={games} />
        </div>
      </>
    </div>
  );
}
