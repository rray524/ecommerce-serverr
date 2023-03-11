const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { db_CONNECT } = require("./db/connect");
const productRoute = require("./routers/product-route");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes middleware
app.use("/api/products", productRoute);

// Routes
app.get("/", (req, res) => {
  res.send("home page");
});

// error middleware
app.use(errorHandler);

// CONNECT MONGODB
db_CONNECT();

// server connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
