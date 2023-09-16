"use client";
import React, { useContext, useEffect, useState } from "react";
import "@/public/CSS/SingleGame.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPencil,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getUserData } from "@/utils/getUserData";
import Cookies from "universal-cookie";
import { MyContext } from "@/app/layout";

import Link from "next/link";

export default function GamePage(id) {
  const [isAdmin, setIsAdmin] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("gamezonetoken");
  const [gameInfo, setGameInfo] = useState([]);
  const gameId = id.params.id;
  const { setLoading } = useContext(MyContext);
  //   console.log(gameId);
  async function fetchData() {
    setLoading(true);
    const req = await fetch(`/api/singleGame/${gameId}`);
    const res = await req.json();
    if (res.status) setGameInfo(res.result);
    setLoading(false);
  }

  async function checkIsAdmin() {
    const userData = await getUserData(token);
    if (userData) {
      const admin = userData.isAdmin;
      if (admin) {
        setIsAdmin(true);
      }
    }
  }

  useEffect(() => {
    checkIsAdmin();
    fetchData();
  }, []);
  const backgroundImage = gameInfo.img
    ? {
        background: `url(/uploads/${gameInfo.img[0]})`,
      }
    : {};
  return (
    <div className="single-game-container" style={backgroundImage}>
      <div className="singleGame-top">
        <div className="singleGame-left">
          <div className="image-name">
            <Image
              style={{ marginLeft: "1rem" }}
              className="small-image"
              src={gameInfo.img !== undefined && `/uploads/${gameInfo.img[0]}`}
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
                  {isAdmin && (
                    <>
                      <Link href={`/dashboard/update_game/${gameInfo._id}`}>
                        <button
                          style={{
                            color: "black",
                            backgroundColor: "greenyellow",
                          }}
                          onClick={() => toast.error("Share don't work")}
                        >
                          <FontAwesomeIcon icon={faPencil} /> Edit
                        </button>
                      </Link>
                      <button
                        style={{
                          color: "black",
                          backgroundColor: "red",
                          marginTop: "10px",
                        }}
                        onClick={() => toast.error("Share don't work")}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </>
                  )}
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
              {isAdmin && (
                <>
                  <Link href={`/dashboard/update_game/${gameInfo._id}`}>
                    <button
                      style={{ color: "black", backgroundColor: "greenyellow" }}
                    >
                      <FontAwesomeIcon icon={faPencil} /> Edit
                    </button>
                  </Link>
                  <button style={{ color: "black", backgroundColor: "red" }}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Image
          src={gameInfo.img !== undefined && `/uploads/${gameInfo.img[0]}`}
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
