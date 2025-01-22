"use client";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebase";
import Notification from "./notification/page";


export default function Home() {
  const [TokenData, setToken] = useState("");

  const requestForToken = async () => {
    try {
      const token = await getToken(messaging);
      setToken(token);
    } catch (error) {
      console.log(error);
      
      console.log("Unable to get token");
    }
  };

  useEffect(() => {
    requestForToken();
  }, []);
  
  return <>
    <Notification myToken={TokenData}/>
  </>;
}
