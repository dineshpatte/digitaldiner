import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`port is listening on ${port}`);
});
