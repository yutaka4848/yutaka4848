let bcrypt = dcodeIO.bcrypt;
//import bcrypt from '../node_module/bcrypt/bcrypt.js';

let btn = document.querySelector('#submitBtn');
btn.onclick = () => {
    let disp = document.querySelector('#msg');
    const result = bcrypt.hashSync('testString', 10)
    disp.textContent = 'Hello!' + result;
}

