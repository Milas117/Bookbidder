const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const createToken = (user, expiresIn = '1h') => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
    authenticateToken,
    createToken
};
