const router = require('express').Router();

const action = require('./action');
const annotation = require('./annotation');
const card = require('./card');
const list = require('./list');
const retro = require('./retro');
const template = require('./template');
const user = require('./user');

router.use('/actions', action);
router.use('/annotations', annotation);
router.use('/cards', card);
router.use('/lists', list);
router.use('/retro', retro);
router.use('/templates', template);
router.use('/users', user);

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
