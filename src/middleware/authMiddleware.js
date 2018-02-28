import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60 * 60 * 24 * 30;
const SECRET = "W3 HAV2 the2 kno2 h9w";

let authenticate = expressJwt(
    { secret: SECRET }
);

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id,
    }, SECRET, {
        expireIn : TOKENTIME
    });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = {
    authenticate,
    generateAccessToken,
    respond
}