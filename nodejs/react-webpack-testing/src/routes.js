require('dotenv').config();


const crypto = require('crypto');
const {Buffer} = require('buffer');

const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const pug = require('pug');

function secure(app){

  app.use((req, res, next) => {
    app.locals.nonce = [
      crypto.randomBytes(18).toString('hex'),
      crypto.randomBytes(18).toString('hex')
    ];
    next();
  });

  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": [(req, res) => `'nonce-${app.locals.nonce[0]}'`, "'strict-dynamic'"],
      "script-src-elem": ["'self'", (req, res) => `'nonce-${app.locals.nonce[1]}'`],
      "style-src": ["'self'"]
    }
  }));
}

function routes(app){
  app.set('view engine', 'pug');
  app.use(express.urlencoded());

  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));
  app.use('/bootstrap', express.static('node_modules/bootstrap/dist/css'));
  // app.set('views', './views'); // pug's default directory is `views`

  app.get('/', async (req, res) => {
    console.log('** page load: ', app.locals.nonce[1]);
    res.render('index.pug', {title: 'Test Some Packages', nonce: app.locals.nonce[0], nonceElem: app.locals.nonce[1]});
  });

  app.get('/api/crypt', (req, res) => {
    
  });

  app.use((err, req, res, next) => {
    fs.writeFile('tmp/current.log', err.stack, (err) => {console.log(err);});
    res.status(500).send('Something broke!');
  });
}

module.exports = {
  routes, secure
}