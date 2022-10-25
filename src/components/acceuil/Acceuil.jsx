import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../ContextAccount/Context";

const Acceuil = () => {
  let { signOut } = useContext(Context);
  return (
    <div className="acceuil">
      <Link to={"/dashboard"}>
        <div className="acceuil-title">
          <FontAwesomeIcon icon={faHome} />
          <p className="acc-title">Acceuil</p>
        </div>
      </Link>
      <div className="abonnement">
        <FontAwesomeIcon icon={faVideo} />
        <Link to="/abonnement">
          <p>Abonnement</p>
        </Link>
      </div>
      <div className="videoLike">
        <FontAwesomeIcon icon={faThumbsUp} />
        <Link to="/videolike">
          <p>Vidèos "j'aime"</p>
        </Link>
      </div>
      <button className="deconnect" onClick={signOut}>
        {" "}
        se déconnecter
      </button>
    </div>
  );
};
export default Acceuil;
