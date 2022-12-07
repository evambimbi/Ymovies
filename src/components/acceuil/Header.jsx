import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {faBars,faSearch,faThumbsUp,} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faVideo} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Context } from "../../ContextAccount/Context";
import { useContext } from "react";
import "./Header.css";
import Notifify from "../Notification";
import { Typography } from "@mui/material";

const Haeder = () => {
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let classname = "Menu-mobil";
  if (menu) {
    classname += " divState";
  } else {
    classname = classname;
  }
  let { signOut } = useContext(Context);
  const handleSearch = (e) => {
    e.preventDefault();
    setText(e.target.value);
    navigate(`/Resultat/${text}`);
  };
  useEffect(() => {
    if (params.hasOwnProperty("SearchQuery")) {
      setText(params.SearchQuery);
    }
  }, [params]);
  const MobilMenu = () => {
    console.log(menu);
    setMenu(!menu);
    console.log(menu);
  };

  const userImg = window.localStorage.getItem("image");
  const name = window.localStorage.getItem("name");
  console.log("mon nom :", name);
  console.log(userImg);
  return (
    <>
      <div className="haeder">
        <Link to="/dashboard">
          <div className="logo-haeder">
            <FontAwesomeIcon icon={faYoutube} />
            <h1 className="haeder-title">Ymovies</h1>
          </div>
        </Link>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}>
                <Tooltip title="Modification profil">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={userImg}></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <Link to="/profilUser">
                  <MenuItem>
                    <Avatar /> Modifié ton profil
                  </MenuItem>
                  <MenuItem>
                    <Typography>{name}</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </div>
            <Notifify />
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
