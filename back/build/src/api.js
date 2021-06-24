"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
exports.api = app;
let articles = [
    { id: 'a1', name: 'Tournevis', price: 2.99, qty: 234 },
    { id: 'a2', name: 'Marteau', price: 5.26, qty: 12 },
];
let seq = 2;
app.get('/articles', (req, res) => {
    res.json(articles);
});
app.use(express_1.default.json());
app.post('/articles', (req, res) => {
    const article = req.body;
    seq++;
    article.id = 'a' + seq;
    articles.push(article);
    res.json(article);
});
app.delete('/articles', (req, res) => {
    const ids = req.body;
    articles = articles.filter(a => !ids.includes(a.id));
    res.status(204).end();
});
//# sourceMappingURL=api.js.map