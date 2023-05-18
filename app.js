const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routes/api/auth");
const moviesRouter = require("./routes/api/movies");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));
app.use((err, req, res, next) => {
  const { status = 500, message = "Error server" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
