import express from 'express';
import serveIndex from 'serve-index';
import cors from 'cors';
import path from 'path';

import {api} from './api-mongo';

// il faudra librairie de typage pour import/from au lieu de require, ça se fait depuis le cdm, ou desuis vscode
const app = express();
const port = +(process.env.ORSYS_PORT || 3000);
const publicDir = process.env.ORSYS_WWDIR || './public';

//app.get("/", (req, res) => {
//  res.send("Hello World!");
//});

const angularDir = path.resolve(process.cwd(), '../front/dist/front');

app.use(cors());

app.use('/api', api);

app.use(express.static(angularDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serveIndex(angularDir));

app.use(express.static(publicDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serveIndex(publicDir));

app.use((req, res) => {
  res.sendFile(path.resolve(angularDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
