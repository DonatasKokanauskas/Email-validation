import React, { useEffect, useState } from "react";
import "../style/css/SignUp.css";
import SocialLinks from "./SocialLinks";

const SignUp = () => {
  const [emailField, setEmailField] = useState<HTMLInputElement>();
  const [emailLabel, setEmailLabel] = useState<HTMLLabelElement>();
  const [emailMessage, setEmailMessage] = useState<HTMLParagraphElement>();
  const [lastEmail, setLastEmail] = useState<string>("");

  useEffect(() => {
    setEmailField(document.getElementById("email-field") as HTMLInputElement);
    setEmailLabel(document.getElementById("email-label") as HTMLLabelElement);
    setEmailMessage(
      document.getElementById("email-message") as HTMLParagraphElement
    );
    setLastEmail(() => {
      const localStorageEmail = localStorage.getItem("lastEmail") as string;
      if (localStorageEmail) {
        return localStorageEmail;
      } else {
        return "";
      }
    });
  }, []);

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
      localStorage.setItem("lastEmail", email);
    }
  };

  return (
    <div className="sign-up">
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
          <button>Get started</button>
          <p id="email-message"></p>
        </form>
      </div>
      <SocialLinks />
    </div>
  );
};

export default SignUp;
