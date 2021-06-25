import express from 'express';
import {MongoClient, ObjectId, Db} from 'mongodb';
import {Article} from './interfaces/article';

const uri =
  process.env.ORSYS_MONGO_URL || 'mongodb://localhost:27017/gestion-stock';
// 'mongodb://toto4:titi@MW31:27017/gestion-stock';
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: +(process.env.ORSYS_MONGO_TIMEOUT || 5000),
});
let db: Db;

(async () => {
  try {
    console.log('about to connect to');
    await client.connect();
    console.log('connexion ok');
    db = client.db('gestion-stock');
  } catch (err) {
    console.log('la connexion à la database foire');
    console.log('err: ', err);
  }
})();

function remap(article: Article) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  article.id = (article as any)._id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (article as any)._id;
}

function remapAll(articles: Article[]) {
  articles.forEach(a => remap(a));
}

const app = express.Router();
export const api = app;

app.get('/articles', (req, res) => {
  (async () => {
    const articles: Article[] = await db
      .collection('articles')
      .find({})
      .toArray();
    remapAll(articles);
    res.json(articles);
  })();
});

app.use(express.json());

app.post('/articles', (req, res) => {
  (async () => {
    const article = req.body as Article;
    const r = await db.collection('articles').insertOne(article);
    const a = r.ops[0];
    remap(a);
    res.json(a);
  })();
});

app.delete('/articles', (req, res) => {
  (async () => {
    const ids = req.body as string[];
    const objectIds = ids.map(id => new ObjectId(id));
    await db.collection('articles').deleteMany({
      _id: {
        $in: objectIds,
      },
    });
    res.status(204).end();
  })();
});
