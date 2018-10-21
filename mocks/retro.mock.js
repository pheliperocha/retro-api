const usersMock = require('../mocks/user.mock');

module.exports = [
    {
        'id': 1,
        'title': 'Retrospective Title 1',
        'context': 'Retrospective Context 1',
        'image': 'http://localhost:4200/assets/images/hopes_concern.png',
        'pin': 1234567,
        'status': true,
        'userId': 1,
        'facilitator': usersMock[0],
        'members': [
            usersMock[1],
            usersMock[2]
        ],
        'state': 3
    },
    {
        'id': 2,
        'title': 'Retrospective Title 2',
        'context': 'Retrospective Context 2',
        'image': 'http://localhost:4200/assets/images/nice_ok.png',
        'pin': 9876543,
        'status': true,
        'userId': 1,
        'facilitador': usersMock[0],
        'members': [],
        'state': 2
    }
];