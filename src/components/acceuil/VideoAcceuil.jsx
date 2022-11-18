import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../../ContextAccount/Context";
import { Link } from "react-router-dom";
import Chargement from "../Chargement";
import numeral from 'numeral';
import moment from 'moment/moment';
import "moment/locale/fr";
import ShowMoreText from "react-show-more-text";
import "./Header.css";

moment.locale("fr");

const VideoAcceuil = () => {
  const { userToken } = useContext(Context);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8&access_token=` +
        userToken
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideo(data);
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
                numeral
                to={`/players/${item.id}`}>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="img-video-content">
                  <p>{item.snippet.channelTitle}</p>
                  <ShowMoreText
                    className="video__title"
                    lines={1}
                    more=""
                    less="Show less"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"..."}>
                    <p className="localized">{item.snippet.localized.title}</p>
                  </ShowMoreText>
                </div>
                <div className="videoAcceuil-info">
                  <div className="comment__info1">
                    {numeral(item.statistics?.viewCount).format("O.a")} vues
                  </div>
                  <div className="comment__info2">
                    {numeral(item.statistics?.likeCount).format("O.a")} j'aimes
                  </div>
                  <div className="comment__info3">
                    {numeral(item.statistics?.commentCount).format("O.a")}{" "}
                    Commentaires
                  </div>
                  <div className="comment__info4">
                    publié : {moment(item.snippet.publishedAt).fromNow()}
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

export default VideoAcceuil;
