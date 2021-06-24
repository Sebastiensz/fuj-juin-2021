import express from "express";

const app = express.Router();

export const api = app;

const articles = [
  { name: "Tournevis", price: 2.99, qty: 234 },
  { name: "Marteau", price: 5.26, qty: 12 },
];

app.get("/articles", (req, res) => {
  res.json(articles);
});
