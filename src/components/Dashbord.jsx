import Header from "./acceuil/Header";
import Acceuil from "./acceuil/Acceuil";
import VideoAcceuil from "./acceuil/VideoAcceuil";
import "./acceuil/Header.css";

export const Dashbord = () => {

    return (
      <div className="dashbord">
        <Header />
        <div className="acceuil-containt">
          <Acceuil />
          <VideoAcceuil />
        </div>
      </div>
    );


}