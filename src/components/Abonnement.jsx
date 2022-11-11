import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chargement from "./Chargement";
import "./connexion/Connexion.css";

const Abonnement = () => {
  const [Abonnement, setAbonnement] = useState([]);
  // const { userToken } = useContext(Context);
  let token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=20&mine=true&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8&access_token=` +
        token
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAbonnement(data);
        console.log(data);
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <p className="chaine-title">Mes chaînes Abonnées</p>
      <div className="abonnement-chaine">
        {!loading ? (
          Abonnement.items?.map((item) => {
            const videoItem = item.snippet.resourceId.channelId;
            return (
              <Link
                key={item.id}
                className="image-chaine"
                to={`/videochannel/${videoItem}`}>
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt="youtube chaine"
                />
                <p>{item.snippet.title}</p>
                <p className="published">{item.snippet.publishedAt}</p>
              </Link>
            );
          })
        ) : (
          <Chargement />
        )}
      </div>
    </>
  );
};

export default Abonnement;
