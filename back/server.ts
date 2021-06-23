import express from "express";
import serveIndex from "serve-index";

// il faudra librairie de typage pour import/from au lieu de require, ça se fait depuis le cdm, ou desuis vscode
const app = express();
const port = +(process.env.ORSYS_PORT || 3000);
const publicDir = process.env.ORSYS_WWDIR || "./public";

//app.get("/", (req, res) => {
//  res.send("Hello World!");
//});

app.use(express.static(publicDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
