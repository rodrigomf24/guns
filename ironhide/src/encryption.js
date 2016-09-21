function Encrypt(value) {
    return JSON.stringify(value);
}

function Decrypt(value) {
    return JSON.parse(value);
}

export { Encrypt, Decrypt };