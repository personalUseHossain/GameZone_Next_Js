"use client";

//font awesome
import { faChessKing, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useContext, useEffect, useState } from "react"; //react hooks
import Link from "next/link"; // link from next js to navigate user to signup
import { useRouter, useSearchParams } from "next/navigation"; //for redirect user to login page
import { MyContext } from "@/app/layout"; //context api

import "@/public/CSS/Login.css"; //css

//alert
import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css

export default function page() {
  const [showPassword, setShowPassword] = useState(false); //toggle showpassword function
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  }); //input values state
  const { setLoading } = useContext(MyContext);
  const nextRouter = useRouter();
  const { login, setLogin } = useContext(MyContext); // get value's from context
  const router = useRouter(); //to push user to other page after logged in
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  //hanlde input change and set the value on the input value state
  function handleInputChange(e) {
    let name = e.target.name,
      value = e.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }
  function redirect() {
    if (login) {
    }
  }
  //login function hanlde submit form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await res.json();
      if (data.status === 200) {
        setLogin(true);
        toast.success(data.message);
        nextRouter.push("/");
        setLoading(false);
      } else if (data.status === 400 || 401 || 500) {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  }

  return (
    <div className="login">
      <ToastContainer />
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="inputs">
          <label>
            <FontAwesomeIcon icon={faUser} />
            <input
              value={userDetails.email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Enter you email..."
            />
          </label>
          <label>
            <FontAwesomeIcon icon={faKey} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter you password..."
              value={userDetails.password}
              name="password"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <p style={{ cursor: "pointer" }}>Show Password</p>
          </label>
        </div>
        <button>Login</button>

        <p className="or">OR</p>
        <div className="quickLogin" style={{ display: "flex", gap: "1rem" }}>
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFUTi1RsVDFSupmzDUJ5I3ZHBtwz043rbHQ&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCvzw4tunVKd4WFXj-iqZwwm_MnIh4dWf5A&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => toast.error("This don't work")}
            style={{ width: "3rem", borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGcq7xPymFEJuiJ1wnxaeWRQyWq62TWAekA&usqp=CAU"
            alt=""
          />
        </div>
        <p>
          Don't have account?{" "}
          <Link style={{ color: "skyblue" }} href={"/signup"}>
            Register
          </Link>{" "}
          now
        </p>
      </form>
    </div>
  );
}
