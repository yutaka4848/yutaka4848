
# Data Plotting 

## Purpose
- Plot data from japanese gov and show graph using `chart.js`.
- This `README.md` is preparing for actual programming and to know how to design a system. (Training for thinking)

## Libraries
- `express` and `pug` engine
- `helmet` for security 
- `chart.js`
- `react`
- `bootstrap`
- `csv`
- japanese gov open data

## CSP
- Set `nonce` for script-src-elem
- Set default `helmet` contentSecurityPolicy

## 🆕 About `csv` and Reading CSV file
- `csv` contains 4 modules
    1. csv-generate: A flexible generator of CSV string and Javascript objects.
    2. csv-parse: A parser converting CSV text into arrays or objects.
    3. stream-transform: A transformation framework.
    4. csv-stringify: A stringifier converting records into a CSV text. It means you can either install the csv 
- Reading CSV file(eventEmitter type)
    - To handle some events, set handling method before writing data.

    ```
    const fs = require("node:fsPromise);
    const csv = require("csv);

    const csvFile = await fs.readFile("readable csv");
    const parser = csv.parse(options);

    // const csvData = await csvParsed.toArray()
    csvParsed.on("readable", () => {
        
    });
    csvParsed.end("readable", () => {
        
    });

    parser.write();
    ```

## Fail to read CSV
- ~~Problems: Fail to read CSV, stop FrontEnd.~~
    1. Separate Fetching data method with submitting plot parameters
    2. Add a button to REfetching data. (Two buttons existing)
- By `csv-parse`, avoiding errors.
    - options: ``

## Some other

### 
1. Preparing root elements for react by HTML(Pug)
2. Appending internal components to root elements

### HTML form element
- `FormData` object of `<input type=checkbox>` returns checked value.

### Event Emitter (Node.js)
- `.on` and `.end` is Node.js eventEmitter module.

### Fetch API
- `fetch` -> Return `Promise` and response has body of `ReadableStream`
- `ReadableStream.getReader` -> `reader.read()`

### Data Parse
- At frontend, push button to fetch data
- At backend, reading csv data from file and send data

### Dynamic import 
- at ES ?
    ```
    import("your module").then(module => {
        module.your_function()
        let your_class = new module.your_class()
    })
    ```
- **NOTICE** At babel transpiling, transform `import` to `require`?
    - At `babel.config.json`
    ```
        {
            "presets": [
                ["@babel/preset-env", { "modules": false }],
                [...]
            ]
        }
    ```
    - ~~One method from [Babel plugin](https://babeljs.io/docs/babel-plugin-proposal-dynamic-import)~~
    - ~~Add plugins to `babel.config.json` ( "@babel/plugin-proposal-dynamic-import" -> "@babel/plugin-transform-dynamic-import")~~
    - ~~These are included in `preset-env`~~~
    ```
    {
        "plugins": [
            "@babel/plugin-transform-dynamic-import",
            "@babel/plugin-transform-modules-commonjs"
        ]
    }
    ```

