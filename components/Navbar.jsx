"use client";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/Navbar.css";

//images
import logo from "@/public/images/logo.png";
import user from "@/public/images/user.jpg";

//font awesome
import {
  faMagnifyingGlass,
  faUser,
  faBarsStaggered,
  faXmark,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const login = false;
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  let menuStyle = { height: "0" };
  if (typeof window !== "undefined" && window.innerWidth < 950) {
    isMenuOpen ? (menuStyle.height = "100vh") : (menuStyle.height = "0");
  }

  return (
    <nav>
      {!openMenu ? (
        <>
          <div className="logo-menu">
            <Link href={"/"}>
              <div className="logo-container">
                <Image
                  src={logo}
                  style={{
                    padding: "2px",
                    borderRadius: "50%",
                    background: "white",
                    marginRight: "3px",
                  }}
                  width={50}
                  height={50}
                  alt="404"
                />
                <h1>
                  Game <br />
                  Zone
                </h1>
              </div>
            </Link>
            <div className="search">
              <input type="text" placeholder="Search..." />
              <FontAwesomeIcon
                className="search_icon_input"
                icon={faMagnifyingGlass}
              />
            </div>
            <FontAwesomeIcon
              className="search_icon"
              onClick={() => setOpenMenu(true)}
              icon={faMagnifyingGlass}
            />
            <FontAwesomeIcon
              onClick={toggleMenu}
              className="bar"
              style={{ color: isMenuOpen ? "black" : "white" }}
              icon={isMenuOpen ? faXmark : faBarsStaggered}
            />
          </div>
          <div className="menu-user" style={menuStyle}>
            <div className="menu">
              <Link href={"/"}>Home</Link>
              <Link href={"/games"}>Games</Link>
              <Link href={"/about"}>About</Link>
              <Link href={"/contact"}>Contact</Link>
            </div>
          </div>
          <div className="user">
            {!login ? (
              <>
                <div className="links_big">
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/signup"}>Register</Link>
                </div>
                <Link href={"/login"} style={{ color: "white" }}>
                  <div className="links_small">
                    <FontAwesomeIcon icon={faUser} />
                    <small>
                      Sign <br />
                      in/up
                    </small>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Image src={user} width={40} height={40} alt="User" />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className="search"
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              style={{ fontSize: "25px" }}
              icon={faArrowLeft}
              onClick={() => setOpenMenu(false)}
            />
            <input
              style={{
                width: "50vw",
                padding: "10px",
                borderRadius: "10px",
              }}
              type="text"
              placeholder="Search..."
            />
            <FontAwesomeIcon
              style={{ fontSize: "25px" }}
              className="search_icon_input"
              icon={faMagnifyingGlass}
            />
          </div>
        </>
      )}
    </nav>
  );
}
