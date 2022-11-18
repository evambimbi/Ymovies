import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {faBars,faSearch,faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faVideo,faBell } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import { Context } from "../../ContextAccount/Context";
import { useContext } from "react";
import "./Header.css";

const Haeder = () => {
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  let classname = "Menu-mobil";
  if (menu) {
    classname += " divState";
  } else {
    classname = classname;
  }
  let { signOut } = useContext(Context);
  const handleSearch = (e) => {
    e.preventDefault();
    // setText(e.target.value);
    navigate(`/Resultat/${text}`);
  };
  useEffect(() => {
  if (params.hasOwnProperty("SearchQuery")){
    setText(params.SearchQuery); 
  } 
  }, [params]);
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
        <form onSubmit={handleSearch} className="input-recherche">
          <input
            id="search-input"
            type="search"
            className="recherche"
            name="search-input"
            placeholder="Recherche"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {text.trim() ? (
            <button className="icon-search" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          ) : (
            <button className="icon-search" disabled>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
        </form>
        <FontAwesomeIcon icon={faBars} onClick={MobilMenu} />
        <div className="profil-user">
          <div className="profil-icon">
            <div className="icon-user">
              <img src={userImg} alt="imageUser" />
            </div>
            <div>
              <FontAwesomeIcon icon={faBell} />
            </div>
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
        <div className="videoLike-mobil">
          <FontAwesomeIcon icon={faThumbsUp} />
          <Link to="/videolike">
            <p>Vidèos "j'aime"</p>
          </Link>
        </div>
        <div className="icon-user">
          <img src={userImg} alt="imageUser" />
        </div>
        <button className="deconnect-mobil" onClick={signOut}>
          se dèconnecter
        </button>
      </div>
    </>
  );
};

export default Haeder;
