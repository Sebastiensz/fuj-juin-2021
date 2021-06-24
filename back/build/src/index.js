"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serve_index_1 = __importDefault(require("serve-index"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const api_mongo_1 = require("./api-mongo");
// il faudra librairie de typage pour import/from au lieu de require, ça se fait depuis le cdm, ou desuis vscode
const app = express_1.default();
const port = +(process.env.ORSYS_PORT || 3000);
const publicDir = process.env.ORSYS_WWDIR || './public';
//app.get("/", (req, res) => {
//  res.send("Hello World!");
//});
const angularDir = path_1.default.resolve(process.cwd(), '../front/dist/front');
app.use(cors_1.default());
app.use('/api', api_mongo_1.api);
app.use(express_1.default.static(angularDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serve_index_1.default(angularDir));
app.use(express_1.default.static(publicDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serve_index_1.default(publicDir));
app.use((req, res) => {
    res.sendFile(path_1.default.resolve(angularDir, 'index.html'));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map