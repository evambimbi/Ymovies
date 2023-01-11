import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import moment from "moment/moment";
import "moment/locale/fr";
import "./Style.css";

moment.locale("fr");

const Commentfrom = ({ comment, socket }) => {
  console.log("comment:", comment);
  const [subComment, setSubComment] = useState(false);

  const ReplyState = () => {
    setSubComment((value) => !value);
  };
  return (
    <div>
      <div className="commnt_user_profil">
        <img src={comment?.userId?.picture} alt="User" />
        <p className="name_user_comment">{comment?.userId?.name}</p>
        <div className="time-comment">
          {moment(parseInt(comment?.time)).fromNow()}
        </div>
      </div>
      <div className="comment-content">
        <p className="commentaire">{comment?.message}</p>
      </div>
      <div className="comment_reponse">
        {/* <div>{comment.subComments.length} Réponses</div> */}
        <div className="reponde" onClick={() => ReplyState()}>
          {comment.subComments.length} Rèpondre
        </div>
        <FontAwesomeIcon icon={faThumbsUp} />
        <FontAwesomeIcon icon={faThumbsDown} />
      </div>
      <div className="reple-comment">
        <Reply trigger={subComment} comment={comment} socket={socket} />
      </div>
    </div>
  );
};

const Reply = ({ trigger, comment, socket }) => {
  const [textSubcomment, setTextSubcomment] = useState();
  const commentId = comment._id;

  const postSubcomment = (event) => {
    event.preventDefault();
    const times = new Date().getTime();
    if (textSubcomment.trim()) {
      socket.emit("sendSubcomment", {
        message: textSubcomment,
        socket: socket.id,
        userId: localStorage.getItem("user"),
        time: times,
        commentId,
      });
      setTextSubcomment("");
    }
  };

  return trigger ? (
    <div>
      <form className="form_comment" onSubmit={postSubcomment}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="répondre"
            variant="standard"
            value={textSubcomment}
            onChange={(e) => setTextSubcomment(e.target.value)}
          />
        </Box>
        <button type="Submit" className="comment_buttun">
          envoyer
        </button>
      </form>
      <div>
        {comment.subComments
          .sort(
            (a, b) =>
              new Date(parseInt(b.time)).getTime() -
              new Date(parseInt(a.time)).getTime()
          )
          .map((subComment) => (
            <React.Fragment key={subComment._id}>
              <div className="subComment">
                <img src={subComment?.userId?.picture} alt="User" />
                <p className="name_user_comment">{subComment?.userId?.name}</p>
                <div className="time-comment">
                  {moment(parseInt(subComment?.time)).fromNow()}
                </div>
              </div>
              <div className="comment-content">
                <p className="commentaire">{subComment?.message}</p>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Commentfrom;
