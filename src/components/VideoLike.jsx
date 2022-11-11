import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextAccount/Context";
import "../App.css";
import Chargement from "./Chargement";

const VideoLike = () => {
  const { userToken } = useContext(Context);
  const [video, setVideo] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=${process.env.REACT_APP_API_KEY}&access_token=` +
        userToken
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideo(data.items);
        setLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);
  if (isError) {
    return <div>not found</div>;
  }
  return (
    <>
      <div className="VideoLike">
        {!loading ? (
          video?.map((video, index) => {
            const videoId = video.id;
            return (
              <Link
                key={index}
                className="VideoLike-content"
                to={`/players/${videoId}`}>
                <img src={video.snippet.thumbnails.medium.url} alt="" />
                <p>{video.snippet.title}</p>
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

export default VideoLike;
