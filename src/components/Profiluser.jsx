import * as React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./Profil.css";
import { IconButton } from "@mui/material";

const Profiluser = () => {
  const [form,setForm] = useState('');
 

  const hadleForm =(e)=>{
    setForm(e.target.value);
     console.log(e.target.value);
  };
 
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
        <form>
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
                defaultValue={form}
              />
              <TextField
                id="outlined-required"
                label="lien facebook"
                defaultValue={form}
              />
              <TextField
                id="outlined-required"
                label="lien instagram"
                defaultValue={form}
              />
              <TextField
                id="outlined-required"
                label="lien twitter"
                defaultValue={form}
              />
            </div>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={hadleForm}>
              Modifier
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Profiluser;
