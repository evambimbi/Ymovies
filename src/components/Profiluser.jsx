import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./Profil.css";
import { IconButton } from "@mui/material";

const Profiluser = () => {
  const [Nom, setNom] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selected, setIsSelected] = useState();

  const id = localStorage.getItem("user");
  console.log(id);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    console.log(selectedFile);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("upload_preset", "eveline");

    fetch("https://api.cloudinary.com/v1_1/dgfc623jt/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Success:", result.secure_url);
        if (result.secure_url) {
          localStorage.setItem("image", result.secure_url);
          const userData = {
            name: Nom,
            facebook: Facebook,
            twitter: Twitter,
            instagram: Instagram,
            picture: isFilePicked,
          };
          axios
            .post(`http://localhost:4000/user/update/${id}`, userData)
            .then((res) => {
              localStorage.setItem("user", res.data.user);
              localStorage.setItem("name ",res.data.user.name);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setIsFilePicked(result.secure_url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const userImg = window.localStorage.getItem("image");

  return (
    <div className="Profiluser">
      <form onSubmit={handleSubmit} className="formprofil" method="post">
        <div className="profil_update">
          <div className="Profil_img">
            <img src={userImg} alt="imageUser" />
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
