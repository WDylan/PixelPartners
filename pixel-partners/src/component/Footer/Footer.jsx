import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <footer>
      <div className="footerLinks">
        <div className="footerLink">
          <ul>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
        <div className="footerSocials">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
        <div className="footerSlogan">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
