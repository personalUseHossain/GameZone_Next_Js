"use client";
import "@/public/CSS/Navbar.css";
import Link from "next/link";
import Image from "next/image";

//check if user authenticated or not
// import { verifyToken } from "@/utils/verifyToken";

//images
import logo from "@/public/images/logo.png";
import user from "@/public/images/user.jpg";

import { MyContext } from "@/app/layout";

import { isAuth, signout, getUserData } from "@/utils/auth";

//font awesome
import {
  faMagnifyingGlass,
  faUser,
  faBarsStaggered,
  faXmark,
  faArrowLeft,
  faBookmark,
  faArrowRightFromBracket,
  faMessage,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css
import { useRouter } from "next/navigation"; //for redirect user to login page

async function checkToken() {
  const check = await isAuth();
  return check;
}

export default function Navbar() {
  let menuHeight = { height: "" };
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { login, setLogin } = useContext(MyContext);
  const [userData, setUserData] = useState({ userData: null, status: false });
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.querySelector(".menu-user").style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.querySelector(".menu-user").style.height = "";
    }
  }
  function logout() {
    signout();
    setLogin(false);
    toast.success("Logged out");
    router.push("/");
  }
  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData();
      if (userData.status) {
        setUserData(userData);
      }
    }
    fetchData();
  }, []);

  return (
    <nav>
      <ToastContainer />
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
          <div className="menu-user" style={menuHeight}>
            <div className="menu">
              <Link href={"/"}>Home</Link>
              <Link href={"/games"}>Games</Link>
              <Link href={"/about"}>About</Link>
              <Link href={"/contact"}>Contact</Link>
            </div>
          </div>
          <div
            className="user"
            style={{ marginRight: "5rem", cursor: "pointer" }}
          >
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
                <Image
                  onClick={() => {
                    document.querySelector(
                      ".user-content-container"
                    ).style.display = "block";
                  }}
                  src={user}
                  width={40}
                  height={40}
                  alt="User"
                />
                <div className="user-content-container">
                  <div className="user-top">
                    <div className="user-top-left">
                      <Image src={user} width={40} height={40} alt="User" />
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => {
                          document.querySelector(
                            ".user-content-container"
                          ).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="user-top-right">
                      <h3>Muhammad Hossain</h3>
                      <small>personal.mdhossain@gmail.com</small>
                    </div>
                  </div>
                  <div className="user-bottom">
                    <div className="user-bottom-content">
                      <FontAwesomeIcon icon={faBookmark} />
                      <h4>Saved Games</h4>
                    </div>
                    <div onClick={logout} className="user-bottom-content">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      <h4>Sign out</h4>
                    </div>
                    <div className="user-bottom-content">
                      <FontAwesomeIcon icon={faMessage} />
                      <h4>Send Feedback</h4>
                    </div>
                    <div className="user-bottom-content">
                      <FontAwesomeIcon icon={faCircleQuestion} />
                      <h4>Support</h4>
                    </div>
                  </div>
                </div>
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
