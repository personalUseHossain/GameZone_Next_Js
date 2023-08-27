"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/public/CSS/Hero_Section.css";

//image
import game_controller_pic from "/public/images/game_controller_pic.png";
import imageList from "@/components/RoundImage";

export default function Hero_Section() {
  let current = imageList.head;
  const [currentImage, setCurrentImage] = useState(current.val.src);
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
        <img src={currentImage} className="hero-slider-image" alt="404" />
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
