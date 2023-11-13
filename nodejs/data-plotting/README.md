
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
- **NOTICE** At babel transpiling, transform `import` to `require`
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

## Personal Memo
- Dev process?
    1. レンダリング前で用意しておくデータリスト
    2. 用意したデータリストからユーザーに選択してもらう
    3. 選択したデータを `fetch`
    4. 読み込んだデータを処理、表示
- In `csv-parser`, sync and stream (or others) existing.
    - 最初にsyncで作ってしまったが、途中でstreamの使い方が(中途半端に)わかったので、そちらで作ろうとしている？
        1. そのためには大きく書き換えることになる
            - 無駄にしたくないので、sync形式で書いたものも残したい
                - デザインパターンfactory形式で、関数からいずれかを振り分ける形式にできる？
        2. メソッド間でデータのやり取りをどうするか
        3. `stream.on`でイベント形式で処理する場合、処理の終わりをどうやって伝えて、次の処理をどうやってスタートするかよくわかっていない
        4. streamで逐次データ処理とエラーハンドリングを期待している
    - callback形式の方が書き換える量は少ない？
    - 🎗️データの前処理(データフォーマットの指定)とparse-syncのオプションでコントロールする
        - format

            | | field1 | field2 | ... |
            | :---: | --- | --- | --- |
            | 2023-11-07 | 1 | 2 | ... |

        - csv-parsed
        ```
        {
            "": [ "", "2023-11-07" ],
            "field1": 15645,
            "field2": 9897,
            .
            .
            .
        }
        ```
        - Fill `field1, field2, ...` if field_name is empty
        - Premise: [csv-parse](#data-parse)


## Directories
data-plotting

| name | desc |
| :--  | :--  |
| main | mainly for nodejs frameworks (serverside libraries) |
| lib | script by JavaScript and transpiled from react by babel |
| src | JSX style script of react |
| views | pug style static html |