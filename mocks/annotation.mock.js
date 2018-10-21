const usersMock = require('../mocks/user.mock');

module.exports = [
    {
        'id': 1,
        'cardId': 1,
        'retroId': 1,
        'description': 'Annotation description 1',
        'status': true,
        'responsibles': [
            usersMock[0],
            usersMock[2],
        ]
    },
    {
        'id': 2,
        'cardId': 1,
        'retroId': 1,
        'description': 'Annotation description 2',
        'status': true,
        'responsibles': []
    },
    {
        'id': 3,
        'cardId': 2,
        'retroId': 1,
        'description': 'Annotation description 3',
        'status': true,
        'responsibles': [
            usersMock[1],
        ]
    },
];