import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../../ContextAccount/Context";
import {Link} from 'react-router-dom'

const VideoAcceuil = () => {
  const { userToken } = useContext(Context);
  const [video, setVideo] = useState([]);
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
      });
  }, [userToken]);
  return (
    <>
      <div className="videoAcceuil">
        {video.items?.map((item) => {
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
        })}
      </div>
    </>
  );
};

export default VideoAcceuil;
