import express from 'express';
import {Article} from './interfaces/article';
import path from 'path';
const app = express.Router();

export const api = app;

const articleFilename = path.resolve(process.cwd(), './data/articles.json');

let articles = [
  {id: 'a1', name: 'Tournevis', price: 2.99, qty: 234},
  {id: 'a2', name: 'Marteau', price: 5.26, qty: 12},
];

let seq = 2;

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.use(express.json());

app.post('/articles', (req, res) => {
  const article = req.body as Article;
  seq++;
  article.id = 'a' + seq;
  articles.push(article);
  res.json(article);
});

app.delete('/articles', (req, res) => {
  const ids = req.body as string[];
  articles = articles.filter(a => !ids.includes(a.id));
  res.status(204).end();
});
