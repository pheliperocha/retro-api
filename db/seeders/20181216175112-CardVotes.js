'use strict';

const CardVotesMock = require('../../mocks/cardVote.mock');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('cardVotes', CardVotesMock, {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('cardVotes', null, {});
    }
};
