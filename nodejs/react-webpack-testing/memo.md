# Memo for this package and not upload github

## Crypto, NodeJS core module, is not work and use browser crypto
(ref: [mdn crypto details](https://developer.mozilla.org/ja/docs/Web/API/Crypto))
// Sample: Encryption
// let password = 'Encryption no kotonanka yokuwakaranai';
// let data = 'kokoga enc shitai data dayo';
// let algorithm = 'aes-256-cbc', salt = 'salt', bitlen = 32;
// let encData;

// console.log('** encryption testing...');
// const keyEn = crypto.scryptSync(password, salt, bitlen);
// const ivEn = crypto.randomFillSync(new Uint8Array(16));
// let cipher = crypto.createCipheriv(algorithm, keyEn, ivEn);
// encData = cipher.update(data, 'utf8', 'hex');
// encData += cipher.final('hex'); // if not call final, result in error.
// console.log(`** encdata(final) is ${encData}(${typeof encData})`);


// Sample: Dencryption
// const keyDe = crypto.scryptSync(password, salt, bitlen);
// let decipher = crypto.createDecipheriv(algorithm, keyDe, ivEn);
// let decData = decipher.update(encData, 'hex', 'utf8');
// decData += decipher.final('utf8');
// console.log(`** decrypted: ${decData}`);
