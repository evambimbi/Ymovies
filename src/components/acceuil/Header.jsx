import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useState } from "react";
import Search from "../Search";
import { useNavigate } from "react-router-dom";

const Haeder = () => {
  const [text, setText] = useState("");
const navigate=useNavigate();
  const handleSearch = () => {
    navigate(`/Resultat/${text}`)
  }

  const userImg = window.localStorage.getItem("image");
  console.log(userImg);
  return (
    <div className="haeder">
      <div className="logo-haeder">
        <FontAwesomeIcon icon={faYoutube} />
        <h1 className="haeder-title">Ymovies</h1>
      </div>
      <div className="input-recherche">
        <input
          id="search-input"
          type="search"
          className="recherche"
          name="search-input"
          placeholder="Recherche"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {/* <Link to={`/Resultat/${text}`}> */}
          <button className="icon-search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        {/* </Link> */}
      </div>
      <div className="profil-user">
        <div className="profil-icon">
          <div className="icon-user">
            <img src={userImg} alt="imageUser" />
          </div>
          <p className="monCompte">Mon compte</p>
        </div>
      </div>
    </div>
  );
};

export default Haeder;
