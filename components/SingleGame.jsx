"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SingleGame(props) {
  async function handleDeleteGame() {
    const req = await fetch(
      `https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/api/delete/${gameId}`
    );
    const res = await req.json();
    if (res.status) {
      return window.history.back();
    }
    if (!res.status) return toast.success(res.message);
  }
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
            <Link
              style={{
                padding: "7px",
                background: "yellowgreen",
                borderRadius: "10px",
              }}
              href={`https://gamezone-d9lyq1q4n-personalusehossain.vercel.app/dashboard/update_game/${game._id}`}
            >
              <FontAwesomeIcon style={{ marginTop: "1rem" }} icon={faPencil} />
            </Link>
          </Link>
        </div>
      </>
    );
  });
}
