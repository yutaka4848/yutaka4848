/* 
  Using module.exports 

*/

require('dotenv').config();
const Express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const noCache = require('nocache');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const crypto = require('crypto');
const pug = require('pug');

const {WeatherApi} = require('./accessOpenMetro.js');
const {WeatherPlots, sampleData} = require('./d3-plot.js');

const weather = new WeatherApi();

// for nonce, not include last equal'=' ?
// for nonce-BASE64_VALUE, set to 'script-src-elem'
// let hash = btoa(crypto.randomBytes(6).toString('hex'));

function secure(app){
  app.locals.docConst = {
    title: 'WeatherAccess', updated: process.env.npm_package_config_updated,
    today: new Date(),
    weather: '-', temperature: '-'
  };
  let form = new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'});
  app.locals.docConst.todayLocale = form.format(app.locals.docConst.today);
  app.locals.docConst.todayISO = app.locals.docConst.todayLocale.replaceAll('/', '-');

  app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
    next();
  });

  app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        'script-src-elem': ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        styleSrc: ["'self'"],
        'style-src-elem': ["'self'"]
      }
  }));

  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(noCache());  
}

function additional(app){
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use('/bootstrap', Express.static('node_modules/bootstrap/dist'));
  app.use('/d3', Express.static('node_modules/d3/dist'));
  app.use('/styles', Express.static('styles'));
  app.use('/static', Express.static('static'));
  app.use('/views', Express.static('views'));
  app.use('/scripts', Express.static('scripts'));
  app.use('/images', Express.static('images'));

  app.locals.logFileName = 'tmp/app.log';

  app.use('/', (req, res, next) => {
    fs.appendFileSync(app.locals.logFileName, `** FROM ${req.ip} - ${req.ip}\n`);
    next();
  });
  app.use(favicon(path.join(__dirname, '../images', 'shiba-puppy.svg')));
}

function routes(app){
  app.get('/', async (req, res) => {
    if(!app.locals.current_weather){
      const d = await fetch('http://localhost:60000/api/today');
      const j = await d.json();
      try{
        app.locals.current_weather = Object.assign(j);
      } catch(err) {
        throw new Error(err);
      }
    }
    
    res.render('index', Object.assign(app.locals.docConst, {cities: weather.citiesList}, app.locals.current_weather));
  });

  app.get('/api/d3/sample', (req, res) => {
    let page = pug.compileFile('views/plot/sample.pug')(app.locals.docConst);
    
    page += pug.render(
      `script(nonce='${res.locals.cspNonce}')\n\t| const Plot = new WeatherPlot();\n\t| Plot.run();`
    );

    res.send(page);
  });

  app.post('/api/d3', (req, res) => {
    if(req.body.start_date && !req.body.end_date){
      req.body.end_date = req.body.start_date;
    } else if(req.body.end_date && !req.body.start_date){
      req.body.start_date = req.body.end_date;
    }
    let opts = Object.assign(weather.getDefaults);
    if(req.body.hours_days === 'daily'){
      delete opts.hourly;
    } else {
      delete opts.daily;
    }
    delete app.locals.weatherData;
    app.locals.weatherData = Object.assign(opts, req.body);
    fs.appendFileSync(app.locals.logFileName, `** params: ${JSON.stringify(req.body)}\n`);
    fs.appendFileSync(app.locals.logFileName, `** params: ${JSON.stringify(app.locals.weatherData)}\n`);

    let page = (pug.compileFile('views/plot/sample.pug'))(app.locals.docConst);
    
    page += pug.render(`script(nonce='${res.locals.cspNonce}')\n
\t\t| fetch('http://localhost:60000/api/weather', {method: "GET", cache: "no-cache"})
\t\t| .then(async function(res){
\t\t|   const d = await res.json();
\t\t|   let Plot = new WeatherPlot(data={${req.body.hours_days}: d['${req.body.hours_days}']});
\t\t|   Plot.run();
\t\t| });`);
    // const page = pug.compileFile('views/index.pug');
    res.send(page);
  });

  app.get('/api/weather', async function(req, res){
    try{
      weather.setOptions(app.locals.weatherData);
      const url = weather.makeApiUrl();
      fs.appendFileSync(app.locals.logFileName, '** url: '+url+'\n');
      const jsonData = await weather.accessApi(url);
      res.json(jsonData);
    } catch (err){
      throw new Error(err);
    }
  });

  app.get('/api/today', async (req, res) => {
    weather.setOptions({
      city: 'Tokyo',
        daily: [
            'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 
            'rain_sum', 'snowfall_sum', 'windspeed_10m_max'
        ],
        timezone: 'Asia%2FTokyo',
        start_date: app.locals.docConst.todayISO, end_date: app.locals.docConst.todayISO,
        current_weather: true, 
        wind_speed_unit: 'ms'
    });

    try{
      const url = weather.makeApiUrl();
      fs.appendFileSync(app.locals.logFileName, '** url: '+url+'\n');
      const today = await weather.accessApi(url);
      res.json(Object.assign(today.current_weather, {city: 'Tokyo'}));
    } catch(err) {
      throw err;
    }
  })
  
  app.get((err, req, res, next) => {
    fs.appendFileSync(app.locals.logFileName, `** ERR: ${err.stack}\n`);
    res.status(500).send('Something broken! and return to top page.');
  })
}

module.exports = {
  secure, additional, routes
};

