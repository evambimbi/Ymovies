import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import Chargement from "./Chargement";
import moment from "moment/moment";
import "moment/locale/fr";
import ShowMoreText from "react-show-more-text";
import "./connexion/Connexion.css";

moment.locale("fr");
const VideoChannel = () => {
        const { channelId } = useParams();
        const [Channel, setChannel] = useState([]);
        const [isError, setIsError] = useState(false);
        const [loading, setLoading] = useState(true);

            useEffect(() => {
              fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=21&key=AIzaSyBTmYh1v0nU5ZBzv9kE7CaWnZY9hfz8HV8`
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setChannel(data.items);
                  setLoading(false);
                })
                .catch(() => setIsError(true));
            }, []);
            console.log("videochaine :", Channel);
            if (isError) {
              return <div>not found</div>;
            }
   return (
     <>
       <div className="videochannel">
         {!loading ? (
           Channel?.map((video, index) => {
             const videoId = video.id.videoId;
             return (
               <Link
                 key={index}
                 className="video-channel"
                 to={`/players/${videoId}`}>
                 <img src={video.snippet.thumbnails.medium.url} alt="" />
                 <div className="comment__info">
                   <ShowMoreText
                     className="video__title"
                     lines={1}
                     more=""
                     less="Show less"
                     anchorClass="show-more-less-clickable"
                     expanded={false}
                     truncatedEndingComponent={"..."}>
                     <p className="localized">{video.snippet.channelTitle}</p>
                   </ShowMoreText>
                   <ShowMoreText
                     className="vide"
                     lines={1}
                     more=""
                     less="Show less"
                     anchorClass="show-more-less-clickable"
                     expanded={false}
                     truncatedEndingComponent={"..."}>
                     <p className="localized">{video.snippet.description}</p>
                   </ShowMoreText>
                   <div className="comment__info">
                     publié : {moment(video.snippet.publishedAt).fromNow()}
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
}

export default VideoChannel;