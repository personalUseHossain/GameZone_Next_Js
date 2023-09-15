"use client";
import React, { useEffect, useState } from "react";
import "@/public/CSS/SingleGame.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function GamePage(id) {
  const [gameInfo, setGameInfo] = useState([]);
  const gameId = id.params.id;
  //   console.log(gameId);
  async function fetchData() {
    const req = await fetch(`/api/singleGame/${gameId}`);
    const res = await req.json();
    if (res.status) setGameInfo(res.result);
  }
  console.log(gameInfo);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="single-game-container"
      style={{ background: `url(/uploads/${gameInfo.img})` }}
    >
      {/* <Image
        src={`/uploads/${gameInfo.img}`}
        alt="game image"
        height={100}
        width={100}
        className="background-single-game"
      /> */}
      <div className="singleGame-top">
        <div className="singleGame-left">
          <div className="image-name">
            <Image
              className="small-image"
              src={`/uploads/${gameInfo.img}`}
              height={70}
              width={70}
              alt="game Image"
            />
            <div>
              <h1>{gameInfo.name}</h1>
              <div className="small-container">
                <div className="button">
                  <button onClick={() => toast.error("Download don't work")}>
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </button>
                  <button onClick={() => toast.error("Share don't work")}>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="big-container">
            <div className="button">
              <button onClick={() => toast.error("Download don't work")}>
                <FontAwesomeIcon icon={faDownload} />
                Download
              </button>
              <button onClick={() => toast.error("Share don't work")}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
          </div>
        </div>
        <Image
          src={`/uploads/${gameInfo.img}`}
          height={300}
          width={300}
          alt="game Image"
        />
      </div>
      {/* <div className="images">
        {gameInfo.img.map((image) => {
          return (
            <Image
              src={`/uploads/${image}`}
              alt="game image"
              height={150}
              width={500}
            />
          );
        })}
      </div> */}
    </div>
  );
}
