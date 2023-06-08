import React, { useEffect, useState } from "react";
import "../style/css/Header.css";

const Header: React.FC = () => {
  const checkBox = document.getElementById("checkbox") as HTMLInputElement;
  const [isChecked, setIsChecked] = useState(false);
  const [nav, setNav] = useState<HTMLElement | null>(null);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    setNav(document.querySelector("nav"));
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize > 900) {
      if (nav) {
        nav.style.cssText = "height: fit-content;";
        setIsChecked(false);
        checkBox.checked = false;
      }
    } else {
      if (nav) {
        nav.style.cssText = "height: 0px;";
        setIsChecked(false);
        checkBox.checked = false;
      }
    }
  }, [windowSize]);

  return (
    <header>
      <h2>Email</h2>
      <div className="burger">
        <input
          type="checkbox"
          id="checkbox"
          onClick={() => {
            if (nav) {
              if (!isChecked) {
                nav.style.cssText = "height: 240px;";
                setIsChecked(true);
              } else {
                nav.style.cssText = "height: 0px;";
                setIsChecked(false);
              }
            }
          }}
        />
        <span className="span-active"></span>
        <span className="span-active"></span>
        <span className="span-active"></span>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#about">About us</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="#signIn">Sign In</a>
          </li>
          <li>
            <a href="#signUp">Get Started</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
