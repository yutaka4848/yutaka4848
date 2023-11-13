
const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const { readdirSync } = require("node:fs");

const Express = require("express");
const helmet = require("helmet");

const csv = require("csv");

module.exports = function (app, { dataDir } = { dataDir: "./data" }) {
    function security() {
        app.locals.defaultCSP = helmet.contentSecurityPolicy.getDefaultDirectives();

        app.use((req, res, next) => {
            app.locals.cspNonce = {
                nonce1: crypto.randomBytes(16).toString("hex")
            }
            next();
        });

        app.use(
            helmet({
                contentSecurityPolicy: {
                    directives: Object.assign(app.locals.defaultCSP, {
                        "script-src-elem": ["'self'"].concat((req, res) => {
                            let result = [];

                            for (const val of Object.values(app.locals.cspNonce)) {
                                result = result.concat(`nonce-${val}`)
                            }

                            return result;
                        })
                    })
                }
            })
        );
    }

    // set middlewares except for security
    function middleware() {
        app.set("view engine", "pug");
        app.use("/lib", Express.static("lib"));
        app.use("/scripts", Express.static("scripts"));
        app.use("/modules/react", Express.static("node_modules/react/umd"));
        app.use("/modules/react-dom", Express.static("node_modules/react-dom/umd"));
        app.use("/modules/chart.js", Express.static("node_modules/chart.js/dist"));
        app.use("/modules/csv", Express.static("node_modules/csv/dist/umd"));
        app.use("/styles/bootstrap", Express.static("node_modules/bootstrap/dist/css"));
        app.use("/styles/css", Express.static("css"));
    }

    function routes() {
        app.get("/", (req, res, next) => {
            const pugParams = app.locals.cspNonce;
            res.render("index", pugParams);
        });

        app.get("/api/list", (req, res) => {
            res.json({ list: app.locals.dataDir });
        });

        app.get("/api/csv", (req, res) => {
            fs
                .readFile("data/data2.csv")
                .then(file => {
                    res.send(file);
                })
        });

        app.get("/api/csv/:filename", (req, res) => {
            const filename = req.params.filename;

            fs
                .readFile(`data/${filename}`)
                .then(file => {
                    res.send(file);
                })

        });
    }

    app.locals.dataDir = readdirSync(dataDir, { encoding: "utf8", recursive: true });

    security();
    middleware();
    routes();

}