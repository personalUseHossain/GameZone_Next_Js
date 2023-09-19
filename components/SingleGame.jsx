"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SingleGame(props) {
  return props.games.map((game) => {
    return (
      <>
        <div className="game" key={game._id}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            href={`/game/${game._id}`}
          >
            <Image
              src={"/uploads/" + game.img[0]}
              height={150}
              width={250}
              alt="404"
            />
            <h4>{game.name}</h4>
          </Link>
        </div>
      </>
    );
  });
}
