import React from "react";
import loader from "../../src/gif/Ripple-1s-200px.gif";
import "../App.css";


const Chargement = () => {

    return (
      <div className="chargement">
        <img
          src={loader}
          alt="chargement"
          height={180}
          width={180}
          style={{ alignSelf: "center" }}
        />
      </div>
    );
}
export default Chargement;