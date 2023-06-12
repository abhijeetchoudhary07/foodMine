const jwt = require('jsonwebtoken');


const auth =  (req, res, next) => {
    const token = req.headers.access_token;
    if(!token) return res.status(401).send();

    try {
        const decodedUser = jwt.verify(token, 'process.env.JWT_SECRET');
        req.user = decodedUser;

    } catch (error) {
        res.status(401).send();
    }

    return next();
}

module.exports = auth