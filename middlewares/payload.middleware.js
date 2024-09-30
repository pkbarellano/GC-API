const crypto = require('../helpers/crypto.helper');

exports.body = async (req, res, next) => {

    const body = req.body;
    const sign = req.header('X-GC-Sign');

    const bodySign = await crypto.hmacSHA256(body);
    
    if (Object.keys(body).length === 0) {
        
        return next();
    }

    if (sign !== bodySign) {
        
        const response = {
            message: 'Unauthorized request.'
        };

        console.log({
            'request-sign': sign,
            'X-GC-Sign': bodySign
        });

        return res.status(422).send(response);
    } else {

        return next();
    }
};