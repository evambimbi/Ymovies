import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Haeder from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import "./connexion/Connexion.css";

const Players = () => {
  let {videoId} = useParams()

    return (
      <>
        <Haeder />
        <Acceuil />
        <div className="player">
          <YouTube width={500} videoId={videoId} />
        </div>
      </>
    );
}

export default Players;