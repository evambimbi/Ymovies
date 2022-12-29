import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { NavLink} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../ContextAccount/Context";
import "./Header.css";

const Acceuil = () => {
  let { signOut } = useContext(Context);
  return (
    <div className="acceuil">
      <NavLink to={"/dashboard"}>
        <FontAwesomeIcon className="Nav-icon" icon={faHome} />
        Acceuil
      </NavLink>
      <NavLink to="/abonnement">
        <FontAwesomeIcon className="Nav-icon" icon={faVideo} />
        Abonnement
      </NavLink>
      <NavLink to="/videolike">
        <FontAwesomeIcon className="Nav-icon" icon={faThumbsUp} />
        Vidèos "j'aime"
      </NavLink>
      <button className="deconnect" onClick={signOut}>
        se dèconnecter
      </button>
    </div>
  );
};
export default Acceuil;
