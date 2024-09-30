const crypto = require('crypto');

const secret = "b46ec615a001243874205f6b060739708edae65de672a980e6ebc57c6389011e";
const algorithm = "SHA256";

const hmacSHA256 = data => {

    const hash = crypto.createHmac(algorithm, secret)
        .update(JSON.stringify(data))
        .digest('hex');

    return hash;
};

module.exports = {
    hmacSHA256: hmacSHA256
};