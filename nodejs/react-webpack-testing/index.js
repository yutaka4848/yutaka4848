
const express = require('express');

const setApp = require('./src/routes.js');

let app = express();
const port = 60000;

setApp.secure(app);
setApp.routes(app);

app.listen(port, () => {
  console.log(`Start Server to listen on ${port}....`);
});