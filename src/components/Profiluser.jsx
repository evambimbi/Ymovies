import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./Profil.css";
import { IconButton } from "@mui/material";

const Profiluser = () => {
  const [Nom, setNom] = useState("");
  const [Facebook, setFacebook]= useState("");
  const [Twitter, setTwitter]= useState("");
  const [Instagram, setInstagram]= useState("");
 

  const hadleNom =(e)=>{
    const name = e.target.value;
    setNom(name);
  };
  const hadleFacebook = (e) => {
    const facebook = e.target.value;
    setFacebook(facebook);
  };
  const hadleTwitter = (e) => {
    const twitter = e.target.value;
    setTwitter(twitter);
  };
  const hadleInstagram = (e) => {
    const instragram = e.target.value;
    setInstagram(instragram);
  };

   const handleSubmit = (e) => {
     e.preventDefault();
     const userData ={
       name :Nom,
       facebook :Facebook,
       twitter :Twitter,
       instagram :Instagram,
     }
     axios
       .put(`http://localhost:5500/user/update/${id}`, userData)
       .then((res) => {
         localStorage.setItem("_id", res.data.user._id);
         console.log(res);
       });};
    const userImg = window.localStorage.getItem("image");
    console.log(userImg);
  return (
    <div className="Profiluser">
      <div className="Profil_img">
        <img src={userImg} alt="imageUser" />
        <form className="form" method="post">
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </form>
      </div>
      <div className="profil_update">
        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off">
            <div>
              <TextField
                id="outlined-required"
                label="Nom"
                defaultValue={Nom}
                onChange={hadleNom}
              />
              <TextField
                id="outlined-required"
                label="lien facebook"
                defaultValue={Facebook}
                onChange={hadleFacebook}
              />
              <TextField
                id="outlined-required"
                label="lien instagram"
                defaultValue={Twitter}
                onChange={hadleTwitter}
              />
              <TextField
                id="outlined-required"
                label="lien twitter"
                defaultValue={Instagram}
                onChange={hadleInstagram}
              />
            </div>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">Modifier</Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Profiluser;
