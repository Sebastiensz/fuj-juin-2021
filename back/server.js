const express = require("express");
const serveIndex = require("serve-index");
const app = express();
const port = process.env.ORSYS_PORT || 3000;
const publicDir = process.env.ORSYS_WWDIR || "./public";

//app.get("/", (req, res) => {
//  res.send("Hello World!");
//});

app.use(express.static(publicDir)); //fct qui renvoie fct est une fct de 1er ordre
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
