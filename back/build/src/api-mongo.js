"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const uri = process.env.ORSYS_MONGO_URL || 'mongodb://localhost:27017/gestion-stock';
// 'mongodb://toto4:titi@MW31:27017/gestion-stock';
const client = new mongodb_1.MongoClient(uri, {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: +(process.env.ORSYS_MONGO_TIMEOUT || 5000),
});
let db;
(async () => {
    try {
        console.log('about to connect to');
        await client.connect();
        console.log('connexion ok');
        db = client.db('gestion-stock');
    }
    catch (err) {
        console.log('la connexion à la database foire');
        console.log('err: ', err);
    }
})();
function remap(article) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    article.id = article._id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete article._id;
}
function remapAll(articles) {
    articles.forEach(a => remap(a));
}
const app = express_1.default.Router();
exports.api = app;
app.get('/articles', (req, res) => {
    (async () => {
        const articles = await db
            .collection('articles')
            .find({})
            .toArray();
        remapAll(articles);
        res.json(articles);
    })();
});
app.use(express_1.default.json());
app.post('/articles', (req, res) => {
    (async () => {
        const article = req.body;
        const r = await db.collection('articles').insertOne(article);
        const a = r.ops[0];
        remap(a);
        res.json(a);
    })();
});
app.delete('/articles', (req, res) => {
    (async () => {
        const ids = req.body;
        const objectIds = ids.map(id => new mongodb_1.ObjectId(id));
        await db.collection('articles').deleteMany({
            _id: {
                $in: objectIds,
            },
        });
        res.status(204).end();
    })();
});
//# sourceMappingURL=api-mongo.js.map