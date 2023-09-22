"use client"; //to use react hooks

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; //fontawesome

import React, { useContext } from "react"; //react for hooks
import { useState } from "react"; //useState hooks
import Link from "next/link"; //for navigate to login page
import { useRouter } from "next/navigation"; //for redirect user to login page

import "@/public/CSS/Login.css"; //adding styling

//alert
import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css
import { MyContext } from "../layout";

export default function page() {
  const router = useRouter(); // to push user to login page

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); // signup user information state
  const { setLoading } = useContext(MyContext);

  //hanlde input change and save it on userDetails state
  function handleInputChange(e) {
    let name = e.target.name,
      value = e.target.value;
    setuserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  //handle form submit
  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      return toast.error("Password and confirm password dosen't match");
    }

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 201) {
          toast.success(data.message);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return;
        } else if (data.error) {
          toast.error(data.error);
          return;
        }
      })
      .catch((err) => {
        toast.error("Internal server error, please try again later."),
          console.log(err);
      });
  }

  return (
    <div className="login">
      <ToastContainer />
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="inputs">
          <label>
            <FontAwesomeIcon icon={faUser} />
            <input
              onChange={handleInputChange}
              name="username"
              value={userDetails.username}
              type="text"
              placeholder="Enter you name..."
            />
          </label>
          <label>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              onChange={handleInputChange}
              name="email"
              value={userDetails.email}
              type="email"
              placeholder="Enter you email..."
            />
          </label>
          <label>
            <FontAwesomeIcon icon={faKey} />
            <input
              onChange={handleInputChange}
              name="password"
              value={userDetails.password}
              type="password"
              placeholder="Enter you password..."
            />
          </label>
          <label>
            <FontAwesomeIcon icon={faLock} />
            <input
              onChange={handleInputChange}
              name="confirmPassword"
              value={userDetails.confirmPassword}
              type="password"
              placeholder="Confirm password..."
            />
          </label>
        </div>
        <button>Signup</button>

        <p className="or">OR</p>
        <div className="quickLogin" style={{ display: "flex", gap: "1rem" }}>
          {/* social login images */}
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%", cursor: "pointer" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFUTi1RsVDFSupmzDUJ5I3ZHBtwz043rbHQ&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%", cursor: "pointer" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCvzw4tunVKd4WFXj-iqZwwm_MnIh4dWf5A&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%", cursor: "pointer" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGcq7xPymFEJuiJ1wnxaeWRQyWq62TWAekA&usqp=CAU"
            alt=""
          />
        </div>
        <p>
          Already have an account?
          <Link style={{ color: "skyblue" }} href={"/login"}>
            Login
          </Link>
          now
        </p>
      </form>
    </div>
  );
}
