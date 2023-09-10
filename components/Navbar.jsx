"use client";

import "@/public/CSS/Navbar.css"; //import css

//from next/*
import Link from "next/link"; // for navigate between pages
import Image from "next/image"; // Image tag from next

//check if user authenticated or not
// import { verifyToken } from "@/utils/verifyToken";

//images
import logo from "@/public/images/logo.png";
import notloginimage from "@/public/images/userImage.png";

import { MyContext } from "@/app/layout";

import { getUserData } from "@/utils/getUserData"; // getting user data from cookies
import { signout } from "@/utils/auth"; //signout function from utils/auth

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
} from "@fortawesome/free-solid-svg-icons"; //all icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //<Fontawesome icon={} /> for this

import { useContext, useEffect, useState } from "react"; // react hooks

import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css
import { useRouter } from "next/navigation"; //for redirect user to login page
import Cookies from "universal-cookie";

export default function Navbar(props) {
  let menuHeight = { height: "" }; //navbar menu-user(home, about etc) height on small device
  const router = useRouter(); // for push user to other pages
  const [isMenuOpen, setIsMenuOpen] = useState(false); // navbar menu-user (home, about etc) is open or not
  const [openMenu, setOpenMenu] = useState(false); // don't know what
  const { login, setLogin } = useContext(MyContext); // getting context data (check if user logged in or not)
  const [userData, setUserData] = useState([]); // userData if logged in
  const cookies = new Cookies(); // for getting cookies
  const token = cookies.get("gamezonetoken"); // token of this website

  // to set the login if user login which is verify in utils/auth.js
  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      }
    }
    fetchData();
  }, [token]);

  // //toggle user-menu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.querySelector(".menu-user").style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.querySelector(".menu-user").style.height = "";
      document.body.style.overflow = "auto";
    }
  }

  //logout function
  function logout() {
    signout();
    setLogin(false);
    toast.success("Logged out");
    router.push("/");
  }
  const userImage = userData.img === null ? notloginimage : userData.img;
  return (
    <nav style={{ display: props.style }}>
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
              <Link onClick={toggleMenu} href={"/"}>
                Home
              </Link>
              {userData.isAdmin && (
                <Link onClick={toggleMenu} href={"/dashboard"}>
                  Dashboard
                </Link>
              )}
              <Link onClick={toggleMenu} href={"/games"}>
                Games
              </Link>
              <Link onClick={toggleMenu} href={"/about"}>
                About
              </Link>
              <Link onClick={toggleMenu} href={"/contact"}>
                Contact
              </Link>
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
                  src={userImage}
                  width={40}
                  height={40}
                  alt="User"
                />
                <div className="user-content-container">
                  <div className="user-top">
                    <div className="user-top-left">
                      <Image
                        src={userImage}
                        width={40}
                        height={40}
                        alt="User"
                      />
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
                      <h3>{userData.name}</h3>
                      <small>{userData.email}</small>
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
