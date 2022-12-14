import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextAccount/Context";
import moment from "moment/moment";
import ShowMoreText from "react-show-more-text";
import Chargement from "./Chargement";
import "../App.css";

const VideoLike = () => {
  const { userToken } = useContext(Context);
  const [video, setVideo] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8&access_token=` +
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
    return <div>not found</div>
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
                <div className="videoLike-params">
                  <ShowMoreText
                    className="video-like"
                    lines={1}
                    more=""
                    less="Show less"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"..."}>
                    <p className="localized">{video.snippet.channelTitle}</p>
                  </ShowMoreText>
                  <ShowMoreText
                    className="video-like2"
                    lines={1}
                    more=""
                    less="Show less"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"..."}>
                    <p className="localized">
                      {video.snippet.localized.description}
                    </p>
                  </ShowMoreText>
                  <div className="comment__info">
                    publi?? : {moment(video.snippet.publishedAt).fromNow()}
                  </div>
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

export default VideoLike;
