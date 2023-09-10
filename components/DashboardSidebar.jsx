import "@/public/CSS/Dashboard/Sidebar.css";
import Image from "next/image";

//font awesome
import {
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

export default function DashboardSidebar() {
  return (
    <>
      {/* sidebar */}
      <div className="sidebar">
        {/* logo */}
        <div className="dashboard_logo">
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
          <h4>Game Zone</h4>
        </div>
        {/* menu */}
        <div className="dashboard_menu">
          <Link href={"/dashboard"}>
            <FontAwesomeIcon icon={faCubes} />
            <h3>Dashboard</h3>
          </Link>
          <Link href={"/dashboard/create_game"}>
            <FontAwesomeIcon icon={faPlus} />
            <h3>Create Game</h3>
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
          <h3>Muhammad Hossain</h3>
          <small>personal.mdhossain@gmail.com</small>
        </div>
      </div>
    </>
  );
}
