require('dotenv').config();


const crypto = require('crypto');
const {Buffer} = require('buffer');

const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const pug = require('pug');

const nonce = require('./nonce.js');

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
      "script-src": ["'unsafe-inline'", (req, res) => `'nonce-${app.locals.nonce[0]}'`, "'strict-dynamic'"],
      "script-src-elem": ["'self'", (req, res) => `'nonce-${app.locals.nonce[1]}'`],
      "style-src": ["'self'"]
    }
  }));
}

function routes(app){
  app.set('view engine', 'pug');

  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));
  app.use('/bootstrap', express.static('node_modules/bootstrap/dist/css'));
  // app.set('views', './views'); // pug's default directory is `views`

  app.get('/', async (req, res) => {
    let password = 'Encryption no kotonanka yokuwakaranai';
    let data = 'kokoga enc shitai data dayo';
    let algorithm = 'aes-256-cbc', salt = 'salt', bitlen = 32;
    let encData;

    console.log('** encryption testing...');
    const keyEn = crypto.scryptSync(password, salt, bitlen);
    const ivEn = crypto.randomFillSync(new Uint8Array(16));
    let cipher = crypto.createCipheriv(algorithm, keyEn, ivEn);
    encData = cipher.update(data, 'utf8', 'hex');
    encData += cipher.final('hex'); // if not call final, result in error.
    console.log(`** encdata(final) is ${encData}(${typeof encData})`);
    
    
    const keyDe = crypto.scryptSync(password, salt, bitlen);
    let ivDe = Buffer.alloc(16, 0);
    let decipher = crypto.createDecipheriv(algorithm, keyDe, ivEn);
    let decData = decipher.update(encData, 'hex', 'utf8');
    decData += decipher.final('utf8');
    console.log(`** decrypted: ${decData}`);

    res.render('index.pug', {title: 'Test Some Packages', nonce: app.locals.nonce[0]});
  });

  app.use((err, req, res, next) => {
    fs.writeFile('tmp/current.log', err.stack, (err) => {console.log(err);});
    res.status(500).send('Something broke!');
  });
}

module.exports = {
  routes, secure
}