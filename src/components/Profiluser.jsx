import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Profil.css";

const Profiluser = () => {
  const [Nom, setNom] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [picture, setPicture] = useState();
  const { id } = useParams();

  const changeHandler = (event) => {
   if (event.target.files && event.target.files[0]) {
     setPicture(URL.createObjectURL(event.target.files[0]))
   }
  };
  const hadleNom = (e) => {
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
  useEffect(() => {
    fetch(`http://localhost:5000/user/getinfo/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setPicture(data.picture));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: Nom,
      facebook: Facebook,
      twitter: Twitter,
      instagram: Instagram, 
      picture: picture,
    };
    fetch(`http://localhost:5000/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="Profiluser">
      <form onSubmit={handleSubmit} className="formprofil" method="put">
        <div className="profil_update">
          <div className="Profil_img">
            <img src={picture} alt="imageUser" />
            <form className="form" method="post">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={changeHandler}
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
        </div>
        <div class="input-profil">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off">
            <div className="">
              <TextField
                id="outlined-required"
                label="Nom"
                name="name"
                defaultValue={Nom}
                onChange={hadleNom}
              />
              <TextField
                id="outlined-required"
                label="lien facebook"
                name="facebook"
                defaultValue={Facebook}
                onChange={hadleFacebook}
              />
              <TextField
                id="outlined-required"
                label="lien instagram"
                name="instragram"
                defaultValue={Twitter}
                onChange={hadleTwitter}
              />
              <TextField
                id="outlined-required"
                label="lien twitter"
                name="twitter"
                defaultValue={Instagram}
                onChange={hadleInstagram}
              />
            </div>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Modifier
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default Profiluser;
