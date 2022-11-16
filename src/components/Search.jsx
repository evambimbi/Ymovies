import React from "react";
import "./connexion/Connexion.css";
import Chargement from "./Chargement";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment/moment";
import ShowMoreText from "react-show-more-text";
import "../App.css"

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
        setVideo(data.items);
        setLoading(false);
      });
  }, []);
     console.log("video :", video);
  return (
    <>
      <p className="resutat_recherche">
        Résultats de la recherche : {SearchQuery}
      </p>
      <div className="Search">
        {!loading ? (
          video?.map((video, index) => {
            const videoId = video.id.videoId;
            return (
              <Link
                key={index}
                className="Search-content"
                to={`/players/${videoId}`}>
                <img src={video.snippet.thumbnails.medium.url} alt="" />
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: ,
                  }}></p> */}
                <div className="comment__info3">
                  <ShowMoreText
                    className="video__title"
                    lines={1}
                    more=""
                    less="Show less"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"..."}>
                    <p className="localized">{video.snippet.title}</p>
                  </ShowMoreText>
                </div>
                <div className="comment__info4">
                  publié : {moment(video.snippet.publishedAt).fromNow()}
                </div>
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

export default Search;
