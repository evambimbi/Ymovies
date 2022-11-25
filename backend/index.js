const http = require("http");
const express = require("express");
const userRoutes = require("./routes/userRoute");

const app = require("./app");

app.use(express.urlencoded({ extended: false }));

// app.set('view engine',"ejs");

// app.use("/", require("./routes/userRoute"));
app.use("/user", userRoutes);

const { PORT } = require("./config");

app.set("port", process.env.Port || PORT);
const server = http.createServer(app);

server.listen(process.env.Port || PORT, () =>
  console.log(`Server listen on port ${PORT}`)
);
