# This page is a memo of webpack-dev-server, express and react for myown.
Although a little bit old, [Tutorial Article at freeCodeCamp by Nathan Sebhastian](https://www.freecodecamp.)
## Requirements
 - I want to use `express` and `react` finally, so add `express`, `helmet` and other utility packages.

```
  npm install react react-dom 
  npm install --save-dev @babel/core @babel/cli babel-roader
  npm install webpack webpack-cli webpack-dev-server
```

## About  Webpack
### `webpack.config.js` : Relation output.publicPath with output.path at dev-server
output.publicPath is url of output.path for (dev-)server, so using at `<script src="~">`

Example: 

  - write at `webpack.config.js`. html root page is `dist` directory
```
  export.module = {
    ...
    output{
      path: __dirname + "/dist",
      publicPath: "/"
    }
    ...
  }
```

## About React
### Event Callback arguement
#### Get Form value for `<button type='button'>`
arguement(=event) is HTMLButtonElement(for button element)
HTMLButtonElement.form -> HTMLFormElement
HTMLFormElement.elements -> HTMLFormControlsCollection
HTMLFormControlsCollection['name of tag'].value

## :lock: About Crypto :key:
### NodeJS Crypto package: Encryption and Decryption
To encrypt and decrypt, you use crypto.createCipheriv and crypto.createDecipheriv. This iv means initialization vector, and __use same iv__ for cipher and decipher.
```
// ivEnc == ivDec is true
let cipher = crypto.createCipheriv(algorithm, key, ivEnc);
let decipher = crypto.createDecipheriv(algorithm, key, ivDec);
```