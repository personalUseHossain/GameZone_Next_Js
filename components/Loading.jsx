import React from "react";
import "@/public/CSS/Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <svg className="loading-svg" viewBox="0 0 1320 300">
        <text
          className="loading-text"
          x="50%"
          y="50%"
          dy=".35em"
          text-anchor="middle"
        >
          GAMEZONE
        </text>
      </svg>
    </div>
  );
}
