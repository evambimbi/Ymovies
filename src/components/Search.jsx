import React from "react";
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";
import Chargement from "./Chargement";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const Search = () => {
  const { SearchQuery } = useParams();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=${SearchQuery}&safeSearch=none&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideo(data.items)
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Haeder />
      <Acceuil />
      <div className="Search">
        {!loading ?
        video.map((video, index) => {
          const videoId = video.id.videoId;
          return (
            <Link
              key={index}
              className="Search-content"
              to={`/players/${videoId}`}>
              <img src={video.snippet.thumbnails.medium.url} alt="" />
              <p>{video.snippet.title}</p>
            </Link>
          );
        }):<Chargement/>}
      </div>
    </>
  );
};

export default Search;
