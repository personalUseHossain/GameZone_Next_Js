"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function notfoundpage() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>404 - Page not found</h1>
      <button
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </div>
  );
}
