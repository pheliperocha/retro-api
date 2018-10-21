const usersMock = require('../mocks/user.mock');
const annotationMock = require('../mocks/annotation.mock');

module.exports = [
    {
        'id': 1,
        'description': 'Card description 1',
        'listId': 1,
        'userId': 1,
        'retroId': 1,
        'status': true,
        'position': 0,
        'user': usersMock[0],
        'annotation': [ annotationMock[0], annotationMock[1] ]
    },
    {
        'id': 2,
        'description': 'Card description 2',
        'listId': 1,
        'userId': 1,
        'retroId': 1,
        'status': true,
        'position': 1,
        'user': usersMock[1],
        'annotation': [ annotationMock[2] ]
    }
];