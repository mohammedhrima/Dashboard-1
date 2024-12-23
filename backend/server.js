const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
const mongoose = require("mongoose")

dotenv.config({ path: path.resolve(__dirname, "../.env")});
const PORT = process.env.PORT || 5000;
const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD

const MONGO_URL = `mongodb://${USERNAME}:${PASSWORD}@localhost:27017/chat?authSource=admin`;

const app = express();
const goals = require("./routes/goals");
const users = require("./routes/user");
mongoose.connect(MONGO_URL, {})
  .then(() => console.log("Database connected successfully"))
  .catch(err => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });
//const { errorHandler } = require("./middleware/error");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/goals/", goals);
app.use("/api/users/", users);

//app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on PORT ", PORT);
});
