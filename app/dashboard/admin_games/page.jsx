"use client";
import React, { useContext, useEffect, useState } from "react";
import "@/public/CSS/Dashboard/Admin_game.css";
import SingleGame from "@/components/SingleGame";
import Link from "next/link";
import { MyContext } from "@/app/layout";

export default function page() {
  const [games, setGames] = useState([]);
  const { setLoading } = useContext(MyContext);
  async function fetchData() {
    setLoading(true);
    const response = await fetch(
      "https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/api/games"
    );
    const data = await response.json();
    setGames(data.data);
    setLoading(false);
  }
  const [search, setSerach] = useState("");
  async function handleSearch() {
    setLoading(true);
    const req = await fetch(
      `https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/api/games?search=${search}`
    );
    const res = await req.json();
    setGames(res.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(games);
  return (
    <div className="admin-game">
      <div className="admin-game-nav">
        <input
          onChange={(e) => setSerach(e.target.value)}
          value={search}
          type="text"
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <>
        <h1 style={{ marginBottom: "2rem" }}>All Games</h1>
        <div className="game-container">
          <SingleGame games={games} />
        </div>
      </>
      {games.length < 1 && (
        <>
          <h1 style={{ margin: "10rem auto", textAlign: "center" }}>
            No Game Found
          </h1>
        </>
      )}
    </div>
  );
}
