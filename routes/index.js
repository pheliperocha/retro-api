const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send({
        'app': 'Agile Retrospective',
        'version': process.env.npm_package_version,
        'description': 'Agile Retrospective',
        'developer': 'Phelipe Rocha',
        'website': 'https://pheliperocha.com/',
        'email': 'phelipeafonso@gmail.com'
    });
});

module.exports = router;
