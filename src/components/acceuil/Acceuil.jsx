import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { NavLink} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../ContextAccount/Context";

const Acceuil = () => {
  let { signOut } = useContext(Context);
  return (
    <div className="acceuil">
      <NavLink to={"/dashboard"}>
        {/* <div className="acceuil-title"> */}
        <FontAwesomeIcon className="Nav-icon" icon={faHome} />
        Acceuil
        {/* <p className="acc-title">Acceuil</p> */}
        {/* </div> */}
      </NavLink>
      {/* <div className="abonnement"> */}
      <NavLink to="/abonnement">
        <FontAwesomeIcon className="Nav-icon" icon={faVideo} />
        Abonnement
        {/* <p>Abonnement</p> */}
      </NavLink>
      {/* </div> */}
      {/* <div className="videoLike"> */}
      <NavLink to="/videolike">
        <FontAwesomeIcon className="Nav-icon" icon={faThumbsUp} />
        Vidèos "j'aime"
        {/* <p>Vidèos "j'aime"</p> */}
      </NavLink>
      {/* </div> */}
      <button className="deconnect" onClick={signOut}>
        {" "}
        se déconnecter
      </button>
    </div>
  );
};
export default Acceuil;
