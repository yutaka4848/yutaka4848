

const Express = require("express");
const helmet = require("helmet");

const port = 62000;
let app = Express();

const init = require("./main/init");

init(app);

app.listen(port, () => {
    console.log(`Listen at port:${port}`);
});