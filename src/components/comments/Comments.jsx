import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Commentfrom from "./Commentfrom";
import "./Style.css";

const Comments = ({ socket }) => {
  const [comment, setComment] = useState([]);
  const [commentaire, setCommentaire] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    socket.on("sendComment", (data) => {
      console.log("sendComment", data);
      if (data) {
        const newCommentaire = [...commentaire, data];
        setCommentaire(newCommentaire);
      }
    });
    socket.on("sendSubcomment", (data) => {
      const newCommentaire = commentaire.map((comment) => {
        if (comment._id === data._id) return data;
        return comment;
      });
      setCommentaire(newCommentaire);
    });
    return () => {
      socket.removeListener("sendComment");
      socket.removeListener("sendSubcomment");
    };
  }, [socket, commentaire]);
  const onSubmit = (e) => {
    e.preventDefault();
    const times = new Date().getTime();
    if (comment.trim()) {
      socket.emit("sendComment", {
        message: comment,
        socket: socket.id,
        userId: localStorage.getItem("user"),
        idVideo: videoId,
        time: times,
      });
      setComment("");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/comment`)
      .then((res) => res.json())
      .then((data) => setCommentaire(data));
  }, []);

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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <button type="Submit" className="comment_buttun">
            envoyer
          </button>
        </form>
        {commentaire
          ?.filter((comment) => comment.idVideo === videoId)
          .sort(
            (a, b) =>
              new Date(parseInt(b.time)).getTime() -
              new Date(parseInt(a.time)).getTime()
          )
          .map((comment) => {
            return (
              <>
                <div className="comment_add" key={comment._id}>
                  <Commentfrom comment={comment} socket={socket} />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
