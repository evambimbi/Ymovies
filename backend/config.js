require("dotenv").config();
const PORT = process.env.PORT || 5000;
const user_database = process.env.user_database;
const password_database = process.env.password_database;


module.exports = { PORT, user_database, password_database };
