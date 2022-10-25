import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";


const VideoChannel = () => {
        const { channelId } = useParams();
        const [Channel, setChannel] = useState([]);
        const [isError, setIsError] = useState(false);

            useEffect(() => {
              fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=21&key=AIzaSyBD5CK_R6LCQmiLLxTu9oxCjs96rKTBxfk`
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setChannel(data.items);
                })
                .catch(() => setIsError(true));
            }, []);
            if (isError) {
              return <div>not found</div>;
            }
   return (
     <>
       <Haeder />
       <Acceuil />

       <div className="videochannel">
         {Channel.map((video, index) => {
           const videoId = video.id.videoId;
           return (
             <Link key={index} className="video-channel" to={`/players/${videoId}`}>
               <img src={video.snippet.thumbnails.medium.url} alt="" />
               <p>{video.snippet.title}</p>
             </Link>
           );
         })}
       </div>
     </>
   );
}

export default VideoChannel;