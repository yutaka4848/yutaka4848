

const Express = require('express');
const weatherApi = require('./scripts/accessOpenMetro.js');

const {secure, routes, additional} = require('./scripts/routes.js');

let app = Express();
const port = 60000;

secure(app);
additional(app);
app.set('view engine', 'pug');

routes(app);


app.listen(port, () => {
    console.log(`listen port for 60000`);
});
