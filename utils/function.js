const CryptoJS = require("crypto-js");
require("dotenv").config();

function encrypt(data) {
    return CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
}

function decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.SECRET_KEY);
    if (bytes.sigBytes > 0) {
        return bytes.toString(CryptoJS.enc.Utf8);
    } else {
        throw new Error("Decryption failed: Invalid Key");
    }
}

const hashFunc = (data) => {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

module.exports = {
    encrypt,
    decrypt,
    hashFunc
}
