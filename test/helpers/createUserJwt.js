const jwt = require('jsonwebtoken');
const userMock = require('../../mocks/user.mock');

module.exports = (index = 0) => {
    const payload = {
        id: userMock[index].id,
        email: userMock[index].email
    };

    return jwt.sign(payload, process.env.SECRETY_KEY, { expiresIn: '12h', algorithm: 'HS256' });
};