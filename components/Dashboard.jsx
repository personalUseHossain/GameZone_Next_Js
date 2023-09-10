import React from "react";
import "@/public/CSS/Dashboard/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="main-dashboard">
      <div className="total-container">
        <div
          className="total"
          style={{ backgroundColor: "rgba(153, 255, 0, 0.596)" }}
        >
          <h1>Total Games</h1>
          <hr
            style={{ height: "2px", background: "black", marginBottom: "2rem" }}
          />
          <h1>100</h1>
        </div>
        <div
          className="total"
          style={{ backgroundColor: "rgba(255, 255, 0, 0.622)" }}
        >
          <h1>Total User's</h1>
          <hr
            style={{ height: "2px", background: "black", marginBottom: "2rem" }}
          />
          <h1>100</h1>
        </div>
        <div
          className="total"
          style={{ backgroundColor: "rgba(255, 0, 0, 0.616)" }}
        >
          <h1>Downloads</h1>
          <hr
            style={{ height: "2px", background: "black", marginBottom: "2rem" }}
          />
          <h1>100</h1>
        </div>
      </div>
      <div className="graph">
        <h1>Graph</h1>
      </div>
    </div>
  );
}
