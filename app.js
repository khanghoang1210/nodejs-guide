const http = require("http");

const express = require("express");

const app = express();

const server = http.createServer(app);
const port = 3000;
server.listen(port);

