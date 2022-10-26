import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../../ContextAccount/Context";
import {Link} from 'react-router-dom';
import Chargement from "../Chargement";
import "./Header.css";

const VideoAcceuil = () => {
  const { userToken } = useContext(Context);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8&access_token=" +
        userToken
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideo(data);
        console.log(data.items)
        setLoading(false);
      });
  }, [userToken]);
  return (
    <>
      <p className="videoAcceuil-title">Les vidèos Populaires</p>
      <div className="videoAcceuil">
        {!loading ? (
          video.items?.map((item) => {
            return (
              <Link
                className="img-video"
                key={item.id}
                to={`/players/${item.id}`}>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <p>{item.snippet.channelTitle}</p>
                <p className="localized">{item.snippet.localized.title}</p>
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

export default VideoAcceuil;
