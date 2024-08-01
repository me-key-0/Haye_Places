const express = require("express");
const { usersRoute } = require("./routes/usersRoute");
require("dotenv").config();

const app = express();
const connectDb = require("./config/db");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

connectDb();

app.use(express.json());
app.use("/users", require("./routes/usersRoute"));
app.use("/places", require("./routes/placesRoute"));