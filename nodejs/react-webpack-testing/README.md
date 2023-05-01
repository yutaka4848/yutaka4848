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

## About :lock::key: Crypto
### NodeJS Crypto package: Encryption and Decryption
To encrypt and decrypt, you use crypto.createCipheriv and crypto.createDecipheriv. This iv means initialization vector, and __use same iv__ for cipher and decipher.
```
// ivEnc == ivDec is true
let cipher = crypto.createCipheriv(algorithm, key, ivEnc);
let decipher = crypto.createDecipheriv(algorithm, key, ivDec);
```


## About :speaker::microphone: Web Audio APIs(Front-End APIs)
### Get Media Device Input(mainly for Audio)
```
let stream = navigator.mediaDevices.getUserMedia();
let context = new AudioContext();

let analyzer = context.createAnalyser();
let stream_node = context.createMediaStreamSource(stream);

stream_node.connect(analyser);

let binSize = analyser.frequencyBinCount // = analyser.fftSize / 2

// for ByteArray
let byteFreq = new Uint8Array(binSize);
let byteTD = new Uint8Array(binSize);
analyser.getByteFrequencyData(byteFreq); 
analyser.getByteTimeDomainData(byteTD); 

// for FloatArray
let byteFreq = new Float32Array(binSize);
let byteTD = new Float32Array(binSize);
analyser.getFloatFrequencyData(byteFreq); 
analyser.getFloatTimeDomainData(byteTD); 


```