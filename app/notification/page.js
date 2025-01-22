"use client";

import React, { useContext, useState } from "react";
import Style from "./style.module.css";
import { MyContext } from "../context/MyContext";

const page = ({ myToken }) => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const requestToCopy = () => {
    navigator.clipboard.writeText(myToken);
  };

  const handleClick = async () => {
    try {
      if (message === "" || token === "") {
        return alert("Please enter message and token");
      }

      const data = {
        messageData: message,
        token: token,
      };

      const res = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={Style.notification}>
      <div className={Style.notification_container}>
        <label htmlFor="">My Token:</label>
        <input type="text" value={myToken} readOnly />
        <div>
          <button onClick={requestToCopy}>Get Token</button>
        </div>
        <label htmlFor="">Enter Your Message: </label>
        <input
          type="text"
          placeholder="enter your message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label htmlFor="">Enter Your Friend's Token to Send:</label>
        <input
          type="text"
          placeholder="enter token to send.."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <div>
          <button onClick={handleClick}>Send Notification</button>
        </div>
      </div>
    </div>
  );
};

export default page;
