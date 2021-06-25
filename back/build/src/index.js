"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebServer_1 = require("./WebServer");
console.log('starting...');
const port = +(process.env.GSTOCK_PORT || '3000');
const server = new WebServer_1.WebServer(port);
server.start();
//# sourceMappingURL=index.js.map