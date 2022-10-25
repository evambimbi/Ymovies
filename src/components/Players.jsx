import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";

const Players = () => {
  let { videoId } = useParams();
  const [video, setVideo] = useState([]);
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=50&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8`
    )
      .then((response) => response.json())
      .then((data) => setVideo(data.items));
  }, []);

  return (
    <>
      <Haeder />
      <Acceuil />
      <div className="player">
        <div className="videoPlayer">
          <YouTube width={500} videoId={videoId} />
        </div>
        <div className="SearchRelated">
          {video.map((video, index) => {
            const videoId = video.id.videoId;
            return (
              <Link
                className="SearchRelated-content"
                key={index}
                to={`/players/${videoId}`}>
                <img src={video.snippet.thumbnails.medium.url} alt="" />
                <p>{video.snippet.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Players;
