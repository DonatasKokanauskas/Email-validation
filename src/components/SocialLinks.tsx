import React from "react";
import "../style/css/SocialLinks.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

const SocialLinks = () => {
  return (
    <div className="social-links">
      <ul>
        <li>
          <a href="#facebook">
            <AiFillFacebook />
          </a>
        </li>
        <li>
          <a href="#twitter">
            <AiOutlineTwitter />
          </a>
        </li>
        <li>
          <a href="#youtube">
            <AiFillYoutube />
          </a>
        </li>
        <li>
          <a href="#linkedin">
            <AiFillLinkedin />
          </a>
        </li>
        <li>
          <a href="#instagram">
            <AiFillInstagram />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
