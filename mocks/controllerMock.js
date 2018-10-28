const Retros = require('../models/index').Retros;
const User = require('../models/index').Users;

module.exports = (req, res) => {
    User.findAll({
        include: [Retros]
    })
        .then(obj => res.status(200).send(obj))
        .catch(err => res.status(400).send(err));
};