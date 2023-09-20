// Footer.js
import React from "react";
import "@/public/CSS/Footer.css";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Image
            src={logo}
            style={{
              borderRadius: "50%",
              background: "white",
              marginRight: "3px",
            }}
            width={50}
            height={50}
            alt="404"
          />
        </div>
        <div className="footer-quick-nav">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/games">Games</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="footer-input">
          <input type="email" placeholder="Subscribe to our newsletter" />
          <button>Subscribe</button>
        </div>
        <div className="footer-social">
          <a
            target="_blank"
            href="https://www.facebook.com/hossain.sikder.716/"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/muhammad-hossain-a14b83265/"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Your GameZone. All rights reserved.
      </div>
      <p>Made by Hossain</p>
    </footer>
  );
}

export default Footer;
