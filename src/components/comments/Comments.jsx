import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Style.css";
import { useParams } from "react-router-dom";

const Comments = ({ userId }) => {
  const [comment, setComment] = useState("");
  const [commentaire, setCommentaire] = useState([]);
  const { videoId } = useParams();
  console.log(comment);

  const commentUrl = `http://localhost:4000/comment/add`;

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(commentUrl, {
        message: comment,
        userId: localStorage.getItem("user"),
        idVideo: videoId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/comment`)
      .then((res) => res.json())
      .then((data) => setCommentaire(data));
  }, []);
  console.log("com", commentaire);
  const userImg = window.localStorage.getItem("image");
  console.log(userImg);

  return (
    <div className="comments">
      <div>
        <form className="form_comment" onSubmit={onSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Laisser un commentaire"
              variant="standard"
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <button type="Submit" className="comment_buttun">
            envoyer
          </button>
        </form>
        {commentaire
          ?.filter((comment) => comment.idVideo === videoId)
          .map((comment) => {
            return (
              <>
                <div className="comment_add">
                  <div className="commnt_user_profil">
                    <img src={comment?.userId.picture} alt="imageUser" />
                    <p className="name_user_comment">{comment?.userId.name}</p>
                  </div>
                  <div className="comment-content">
                    <p className="commentaire">{comment?.message}</p>
                  </div>
                  <div className="comment_reponse">
                    <span>Repondre</span>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
