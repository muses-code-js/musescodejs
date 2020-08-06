const { Text, Relationship, Integer } = require('@keystonejs/fields');
const { DEFAULT_LIST_ACCESS } = require('../lib/access');

module.exports = function(keystone) {
  keystone.createList('Organiser', {
    access: DEFAULT_LIST_ACCESS,
    fields: {
      user: { type: Relationship, ref: 'User' },
      order: { type: Integer },
      role: { type: Text },
    },
  });
};
