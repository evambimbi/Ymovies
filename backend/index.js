const userRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/commentRoute");
const action = require("./action/commentAction");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = require("./app");
const http = require("http").Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("sendComment", (data) => {
    action.createComment(
      data,
      (data) => {
        console.log("data", data);
        socketIO.emit("sendComment", data);
      },
      (error) => {}
    );
  });

  socket.on("sendSubcomment", (data) => {
    action.reply(
      data,
      (data) => {
        console.log("data-reply", data);
        socketIO.emit("sendSubcomment", data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.use(cors());

app.use("/user", userRoutes);

app.use("/comment", commentRoutes);

const { PORT } = require("./config");

app.set("port", process.env.Port || PORT);

http.listen(process.env.Port || PORT, () =>
  console.log(`Server listen on port ${PORT}`)
);
