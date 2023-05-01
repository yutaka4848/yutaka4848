
const React = require('react');
const ReactDOM = require('react-dom/client');

const ivLength = 16;
// document.cuurentScript is only before processing scripts
// console.log(`** current${document.currentScript.nonce.length}: `, document.currentScript.nonce);
let ivBase = document.currentScript.nonce.slice(0, ivLength);

class Encryption extends React.Component{
  constructor(props){
    super(props);
    this.state = Object.assign(this.defaultState);
    console.log(ivBase);
    ivBase = new Array(...ivBase);
    ivBase.forEach((val, idx) => {
      this.state.iv[idx] = val.charCodeAt();
    })    
    console.log(this.state.iv);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.encryptData = this.encryptData.bind(this);
    this.arrayBufferToString = this.arrayBufferToString.bind(this);
  }

  defaultState = {
    passwd: '',
    iv: new Uint8Array(ivLength), // use browser's crypto, not nodejs core
    key: null,
    algorighm: 'AES-CBC',
    salt: '',    
    bitlen: 32,
    enc: ''
  }

  getEncoded(data){
    let coder = new TextEncoder();
    return coder.encode(data);
  }

  getDecoded(data){
    let decoder = new TextDecoder();
    return decoder.decode(data);
  }

  arrayBufferToString(ab){
    let uar = new Uint8Array(ab);
    return String.fromCharCode(...uar)
  }

  async encryptData(data){
    let key = await crypto.subtle.generateKey({
      name: this.state.algorighm,
      length: 256
    }, true, ['encrypt', 'decrypt']);

    let enc = await crypto.subtle.encrypt({
      name: this.state.algorighm, 
      iv: this.state.iv
    }, 
      key,
      data
    );

    let ex = Object.assign(await crypto.subtle.exportKey('jwk', key));
    
    return {key: ex, enc};
  }

  async decryptData(data, keyjwk){
    let dec = 'Decryption Failure !';
    
    let key = await crypto.subtle.importKey(
      'jwk', keyjwk, 'AES-CBC', true, ['encrypt', 'decrypt']
    );
    dec = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: this.state.iv},
      key, data
    );
    let result = new Uint8Array(dec);

    return String.fromCharCode(...result);
  }

  async handleSubmit(e){
    let passwd = e.target.form.elements.passwd.value;
    const encrypted = await this.encryptData(this.getEncoded(passwd));
    const decrypted = await this.decryptData(encrypted.enc, encrypted.key);

    console.log(this.arrayBufferToString(encrypted.enc));
    this.setState({passwd, key: encrypted.key, enc: encrypted.enc, dec: decrypted});
  }

  componentDidUpdate(){
    console.log(`** URL requested is ${document.URL}`);
  }

  render(){
    return (
      <div>
        <form>
          <fieldset>
            <label for='passwd'></label>
            <input type='password' id='passwd' name='passwd'></input>
          </fieldset>
          <button type='button' className='badge bg-primary' onClick={this.handleSubmit}>SUBMIT</button>
        </form>
        <div>{this.state.passwd && this.arrayBufferToString(this.state.enc)}</div>
        <div>{this.state.passwd && this.state.dec}</div>
      </div>
    )
  }
}

let div = document.createElement('div')
let root = ReactDOM.createRoot(div);
root.render(<Encryption />);
document.querySelector('main').append(div);

