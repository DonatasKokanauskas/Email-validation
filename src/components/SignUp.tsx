import React, { useEffect, useState } from "react";
import "../style/css/SignUp.css";
import axios from "axios";
import SocialLinks from "./SocialLinks";
import cover from "../images/cover.jpg";

const SignUp = () => {
  const [emailField, setEmailField] = useState<HTMLInputElement>();
  const [emailLabel, setEmailLabel] = useState<HTMLLabelElement>();
  const [emailMessage, setEmailMessage] = useState<HTMLParagraphElement>();
  const [lastEmail, setLastEmail] = useState<string>("");
  const [ip, setIP] = useState<string>("");
  const [apiData, setApiData] = useState<
    { email: string; ipAddress: string }[]
  >([]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");
    setIP(res.data.ip);
  };

  useEffect(() => {
    setEmailField(document.getElementById("email-field") as HTMLInputElement);
    setEmailLabel(document.getElementById("email-label") as HTMLLabelElement);
    setEmailMessage(
      document.getElementById("email-message") as HTMLParagraphElement
    );
    getData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.jsonbin.io/v3/b/647de7488e4aa6225ea98f9f",
        {
          headers: {
            "X-Master-Key":
              "$2b$10$3LJ.NgDg5gXwRup9ken64eh7/RcMxrHtMKbKHeR0fCYlXHmcVMA8u",
          },
        }
      );

      res.data.record.forEach((obj: { ipAddress: string; email: string }) => {
        if (obj.ipAddress === ip) {
          setLastEmail(obj.email);
        }
      });

      setApiData(res.data.record);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ip]);

  useEffect(() => {
    if (emailField) {
      emailField.value = lastEmail;
      emailField.style.border = "3px solid #24b17d";
      emailField.style.paddingLeft = "14px";
      if (emailLabel) {
        emailLabel.style.top = "1px";
        emailLabel.style.color = "#cfcfcf";
      }
    }
  }, [lastEmail]);

  const handleKeyUp = () => {
    if (
      !emailField?.value.match(
        /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
      ) &&
      emailField?.value !== ""
    ) {
      if (emailMessage) {
        emailMessage.innerHTML = "Please enter valid email address";
        emailMessage.style.color = "red";
        if (emailLabel) {
          emailLabel.style.top = "1px";
          emailLabel.style.color = "#cfcfcf";
        }
        if (emailField) {
          emailField.style.border = "none";
          emailField.style.paddingLeft = "17px";
        }
      }
    } else if (emailField?.value === "") {
      if (emailMessage) {
        emailMessage.innerHTML = "Email is required";
        emailMessage.style.color = "red";
        if (emailLabel) {
          emailLabel.style.top = "14px";
          emailLabel.style.color = "#757575";
        }
        if (emailField) {
          emailField.style.border = "none";
          emailField.style.paddingLeft = "17px";
        }
      }
    } else {
      if (emailMessage) {
        emailMessage.innerHTML = "Your email adress is valid";
        emailMessage.style.color = "green";
        if (emailLabel) {
          emailLabel.style.top = "1px";
          emailLabel.style.color = "#cfcfcf";
        }
        if (emailField) {
          emailField.style.border = "3px solid #24b17d";
          emailField.style.paddingLeft = "14px";
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        "https://api.jsonbin.io/v3/b/647de7488e4aa6225ea98f9f",
        apiData,
        {
          headers: {
            "content-type": "application/json",
            "X-Master-Key":
              "$2b$10$3LJ.NgDg5gXwRup9ken64eh7/RcMxrHtMKbKHeR0fCYlXHmcVMA8u",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    const formElement = document.querySelector("form") as HTMLFormElement;
    const data = new FormData(formElement);
    const formObject = Object.fromEntries(data.entries());
    const email = String(formObject.email);
    if (
      emailField?.value.match(
        /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
      ) &&
      emailField?.value !== ""
    ) {
      setApiData(() => {
        return [
          ...apiData.filter((obj) => obj.ipAddress !== ip),
          { email: email, ipAddress: ip },
        ];
      });
    }
  };

  return (
    <div className="sign-up">
      <img src={cover} alt="cover image" />
      <div className="input-container">
        <h1>We help you manage your website successfully!</h1>
        <p>Please enter your email address</p>
        <form onSubmit={handleSubmit}>
          <label id="email-label" htmlFor="email-field">
            Email address
          </label>
          <input
            id="email-field"
            type="email"
            name="email"
            spellCheck="false"
            onKeyUp={handleKeyUp}
          />
          <button onClick={handleClick}>Get started</button>
          <p id="email-message"></p>
        </form>
      </div>
      <SocialLinks />
    </div>
  );
};

export default SignUp;
