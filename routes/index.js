const router = require('express').Router();

const action = require('./action');
const annotation = require('./annotation');
const card = require('./card');
const list = require('./list');
const retro = require('./retro');
const template = require('./template');
const user = require('./user');

router.get('/actions', action);
router.use('/annotations', annotation);
router.use('/cards', card);
router.use('/lists', list);
router.use('/retro', retro);
router.get('/templates', template);
router.use('/user', user);

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
