const { Text, DateTime, Relationship } = require('@keystonejs/fields');
const { DEFAULT_LIST_ACCESS } = require('../lib/access');

module.exports = function(keystone) {
  keystone.createList('Post', {
    access: DEFAULT_LIST_ACCESS,
    fields: {
      member: { type: Relationship, ref: 'User', many: false },
      title: { type: Text },
      author: { type: Text },
      date: { type: DateTime },
    },
  });
};
