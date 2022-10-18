import React from "react";
import { useEffect, useState, useContext } from "react";
import { Context } from "../ContextAccount/Context";
import { Link } from "react-router-dom";
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";


const Abonnement = () => {
  const [Abonnement, setAbonnement] = useState([]);
  // const { userToken } = useContext(Context);
    let token = window.localStorage.getItem("token");
  
  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=20&mine=true&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8&access_token="+token)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAbonnement(data);
        console.log(data);
      });
  }, [token]);
       

  return (
    <>
      <Haeder />
      <Acceuil />
      <div className="abonnement-chaine">
        {Abonnement.items?.map((item) => {
          const videoItem = item.snippet.resourceId.channelId;
          return (
            <Link key={item.id} className="image-chaine" to={`/videochannel/${videoItem}`}>
              <img
                src={item.snippet.thumbnails.default.url}
                alt="youtube chaine"
              />
                <p>{item.snippet.title}</p>
                <p className="published">{item.snippet.publishedAt}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Abonnement;
