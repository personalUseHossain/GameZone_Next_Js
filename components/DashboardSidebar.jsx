"use client";
import "@/public/CSS/Dashboard/Sidebar.css";
import Image from "next/image";

//font awesome
import {
  faBarsStaggered,
  faCubes,
  faGamepad,
  faHome,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; //all icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //<Fontawesome icon={} /> for this
import Link from "next/link";

import userImage from "@/public/images/myimage.jpg";
import logo from "@/public/images/logo.png";
import { useState } from "react";

export default function DashboardSidebar() {
  const [sidebaropen, setsidebarope] = useState(true);
  const hide = {
    display: !sidebaropen ? "none" : "block",
  };
  return (
    <>
      {/* sidebar */}
      <div
        className="sidebar"
        style={sidebaropen ? { width: "13rem" } : { width: "1rem" }}
      >
        {/* logo */}
        <div className="dashboard_logo">
          <FontAwesomeIcon
            icon={faBarsStaggered}
            onClick={() => setsidebarope(!sidebaropen)}
          />
          <Image
            src={logo}
            style={{
              padding: "2px",
              background: "white",
              marginRight: "3px",
            }}
            width={40}
            height={40}
            alt="404"
          />
        </div>
        {/* menu */}
        <div className="dashboard_menu">
          <Link href={"/dashboard"}>
            <FontAwesomeIcon icon={faCubes} />
            <h3>Dashboard</h3>
          </Link>
          <Link href={"/dashboard/create_game"}>
            <FontAwesomeIcon icon={faPlus} />
            <h3>Create</h3>
          </Link>
          <Link href={"/dashboard/admin_games"}>
            <FontAwesomeIcon icon={faGamepad} />
            <h3>Games</h3>
          </Link>
          <Link href={"/dashboard/all_admins"}>
            <FontAwesomeIcon icon={faUser} />
            <h3>Admin's</h3>
          </Link>
          <Link href={"/"}>
            <FontAwesomeIcon icon={faHome} />
            <h3>Home</h3>
          </Link>
        </div>
        <div className="adminInfo">
          <Image
            style={{ borderRadius: "50%" }}
            src={userImage}
            width={40}
            height={40}
            alt="User"
          />
          <h3 style={hide}>Muhammad Hossain</h3>
          <small style={hide}>personal.mdhossain@gmail.com</small>
        </div>
      </div>
    </>
  );
}
