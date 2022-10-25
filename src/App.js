import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Connexion from "./components/connexion/Connexion";
import { Context } from "./ContextAccount/Context";
import { gapi, loadAuth2 } from "gapi-script";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dashbord } from "./components/Dashbord";
import Abonnement from "./components/Abonnement";
import Players from "./components/Players";
import VideoChannel from "./components/VideoChannel";
import Search from "./components/Search";
import VideoLike from "./components/VideoLike";

function App() {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let token = window.localStorage.getItem("token");

  const ApiKey =
    "607682539682-tl7b5cm2cfftr62at32bvj04rr3sdpml.apps.googleusercontent.com";
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        ApiKey,
        "https://www.googleapis.com/auth/youtube"
      );
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("btnConnexion"), auth2);
      }
    };
    setAuth2();
  }, []);
  const attachSignin = (element, auth2) => {
    auth2?.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };
  const updateUser = (user) => {
    console.log(user);
    console.log(token);
    localStorage.setItem("token", user.xc.access_token);
    setUserToken(token);
    navigate("/dashboard");
    const profileImg = user.getBasicProfile().getImageUrl();
    localStorage.setItem("image", profileImg);
  };
  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
      navigate("/");
    });
  };
  return (
    <>
      <Context.Provider
        value={{ userToken, setUserToken, attachSignin, signOut }}>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/players/:videoId" element={<Players />} />
          <Route path="/videochannel/:channelId" element={<VideoChannel />} />
          <Route path="/Resultat/:SearchQuery" element={<Search />} />
          <Route path="/videolike" element={<VideoLike />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
