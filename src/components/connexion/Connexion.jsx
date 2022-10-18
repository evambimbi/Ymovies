import "./Connexion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Context } from "../../ContextAccount/Context";
import { useContext } from "react";

const Connexion = () => {
  const { attachSignin } = useContext(Context);

  return (
    <div className="connexion">
      <div className="connexion-logo">
        <FontAwesomeIcon icon={faYoutube} />
        <h1 className="connexion-title">Ymovies</h1>
      </div>
      <div className="connexion-content">
        <button id="btnConnexion" onClick={attachSignin}>
          se connecter avec son compte google
        </button>
      </div>
    </div>
  );
};

export default Connexion;
