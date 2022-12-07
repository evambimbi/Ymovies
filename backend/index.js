const http = require("http");
const express = require("express");
const userRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/commentRoute");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = require("./app");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// app.use("/", require("./routes/userRoute"));
app.use("/user", userRoutes);
// app.post("user/update/:user",(req,res)=>{console.log(req.body)});

app.use("/comment", commentRoutes);

const { PORT } = require("./config");

app.set("port", process.env.Port || PORT);
const server = http.createServer(app);

server.listen(process.env.Port || PORT, () =>
  console.log(`Server listen on port ${PORT}`)
);
