import React from "react";
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Search = () => {
  const { SearchQuery } = useParams();
  const [video, setVideo] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&q=${SearchQuery}&safeSearch=none&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8`
    )
      .then((response) => response.json())
      .then((data) => setVideo(data.items));
  }, []);
  return (
    <>
      <Haeder />
      <Acceuil />
      <div>
        {video.map((video) => {
          return (
            <div>
              <img src={video.snippet.thumbnails.medium.url} alt="" />
              <div>
                <p>{video.snippet.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;
