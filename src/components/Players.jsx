import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Chargement from "./Chargement";
import Comments from "./comments/Comments";
import "./connexion/Connexion.css";

const Players = () => {
  let { videoId } = useParams();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=50&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideo(data.items);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="player">
        <div className="videoPlayer">
           <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowFullScreen"></iframe>
        </div>

        <Comments currentUserId="1"/>

        {/* <div className="SearchRelated">
          {!loading ? (
            video?.map((video, index) => {
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
            })
          ) : (
            <Chargement />
          )}
        </div> */}
      </div>
    </>
  );
};

export default Players;
