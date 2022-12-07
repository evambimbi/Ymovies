import React from "react";
import axios from "axios";
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
import Haeder from "./components/acceuil/Header";
import Acceuil from "./components/acceuil/Acceuil";
import Profiluser from "./components/Profiluser";

function App() {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let token = window.localStorage.getItem("token");

  const ApiKey =
    "607682539682-tl7b5cm2cfftr62at32bvj04rr3sdpml.apps.googleusercontent.com";
  const addUserUrl = "http://localhost:5500/user/add";

  const addUser = (username, email, picture) => {
    axios
      .post(addUserUrl, {
        name: username,
        email: email,
        picture: picture,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", res.data.user._id);
      });
  };
  // const retrieve =()=>{
  //   axios.get(`http://localhost:5500/user/add`,user).then((res) => console.log(res));

  // }
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
    noAcces();
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
    //appel au backend en passant user en params
    localStorage.setItem("token", user.xc.access_token);
    setUserToken(token);
    addUser(user.wt.Ad, user.wt.cu, user.wt.hK);
    navigate("/dashboard");
    const profileImg = user.getBasicProfile().getImageUrl();
    localStorage.setItem("image", profileImg);
  };
  const noAcces = () => {
    if (!token) {
      navigate("/");
    }
  };
  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
      navigate("/");
      localStorage.removeItem("token");
      window.location.reload();
    });
  };
  const Layout = ({ children }) => {
    return (
      <>
        <Haeder />
        <Acceuil />
        <div>{children}</div>
      </>
    );
  };
  return (
    <>
      <Context.Provider
        value={{ userToken, setUserToken, attachSignin, signOut }}>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashbord />
              </Layout>
            }
          />
          <Route
            path="/abonnement"
            element={
              <Layout>
                <Abonnement />
              </Layout>
            }
          />
          <Route
            path="/players/:videoId"
            element={
              <Layout>
                <Players />
              </Layout>
            }
          />

          <Route
            path="/videochannel/:channelId"
            element={
              <Layout>
                <VideoChannel />
              </Layout>
            }
          />

          <Route
            path="/Resultat/:SearchQuery"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />

          <Route
            path="/videolike"
            element={
              <Layout>
                <VideoLike />
              </Layout>
            }
          />
          <Route
            path="/profilUser"
            element={
              <Layout>
                <Profiluser />
              </Layout>
            }
          />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
