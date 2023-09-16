"use client";
import React, { useState, useEffect } from "react"; // react hooks

import Image from "next/image"; // Image tag from next js

import "@/public/CSS/Hero_Section.css"; // css

//image
import game_controller_pic from "/public/images/game_controller_pic.png";
import imageList from "@/utils/RoundImage"; // image linked list

export default function Hero_Section() {
  //for make the slider
  let current = imageList.head; //image linked list head
  const [currentImage, setCurrentImage] = useState(current.val.src); //current image state

  //change image
  useEffect(() => {
    const interval = setInterval(() => {
      current = current.next;
      setCurrentImage(current.next.val.src);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-slider">
        <Image
          width={1000}
          height={1000}
          src={currentImage}
          className="hero-slider-image"
          alt="image not found"
        />
      </div>
      <div className="hero-section">
        <div className="hero-left">
          <h2>Join the Gaming Revolution</h2>
          <h1>
            Discover the Ultimate <br />
            Gaming Experience.
          </h1>
          <button>Explore</button>
          <button>Start Downloading</button>
        </div>
        <div className="hero-right">
          <Image
            className="hero-right-image"
            src={game_controller_pic}
            width={350}
            height={350}
            alt="Image not found"
          />
        </div>
      </div>
    </div>
  );
}
