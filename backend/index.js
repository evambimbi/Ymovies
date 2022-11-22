const http = require("http");

const app = require("./app");


const { PORT } = require("./config");

app.set("port", process.env.Port || PORT);
const server = http.createServer(app);

server.listen(process.env.Port || PORT, () =>
  console.log(`Server listen on port ${PORT}`)
);
