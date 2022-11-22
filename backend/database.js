const mongoose = require("mongoose");
const { user_database, password_database } = require("./config");

const connecterDb = () => {
  mongoose
    .connect(
      `mongodb+srv://${user_database}:${password_database}@cluster0.tsvbwte.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connexion à mongoose reussie"))
    .catch((error) => {
      console.log("connexion echouée");
    });
};

module.exports = connecterDb;
