const jwt = require('jsonwebtoken');
const userMock = require('../../mocks/user.mock');

module.exports = () => {
    const payload = {
        id: userMock[0].id,
        email: userMock[0].email
    };

    return jwt.sign(payload, process.env.SECRETY_KEY, { expiresIn: '12h', algorithm: 'HS256' });
};