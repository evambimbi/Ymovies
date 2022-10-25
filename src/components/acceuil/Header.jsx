import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBars,faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../ContextAccount/Context";
import { useContext } from "react";


const Haeder = () => {
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();
  let classname = "Menu-mobil";
  if (menu) {
    classname += " divState";
  } else {
    classname = classname;
  }
  let { signOut } = useContext(Context);
  const handleSearch = () => {
    navigate(`/Resultat/${text}`);
  };
  const MobilMenu = () => {
    console.log(menu);
    setMenu(!menu);
    console.log(menu);
  };

  const userImg = window.localStorage.getItem("image");
  console.log(userImg);
  return (
    <>
      <div className="haeder">
        <div className="logo-haeder">
          <FontAwesomeIcon icon={faYoutube} />
          <h1 className="haeder-title">Ymovies</h1>
        </div>
        <div className="input-recherche">
          <input
            id="search-input"
            type="text"
            className="recherche"
            name="search-input"
            placeholder="Recherche"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="icon-search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <FontAwesomeIcon icon={faBars} onClick={MobilMenu} />
        <div className="profil-user">
          <div className="profil-icon">
            <div className="icon-user">
              <img src={userImg} alt="imageUser" />
            </div>
            <p className="monCompte">Mon compte</p>
          </div>
        </div>
      </div>

      <div className={classname}>
        <Link to={"/dashboard"}>
          <div className="Menu-title">
            <FontAwesomeIcon icon={faHome} />
            <p className="acceuil-mobil">Acceuil</p>
          </div>
        </Link>
        <div className="abonnement-mobil">
          <FontAwesomeIcon icon={faVideo} />
          <Link to="/abonnement">
            <p>Abonnement</p>
          </Link>
        </div>
        <div className="icon-user">
          <img src={userImg} alt="imageUser" />
        </div>
        <button className="deconnect-mobil" onClick={signOut}>
          se déconnecter
        </button>
      </div>
    </>
  );
};

export default Haeder;
