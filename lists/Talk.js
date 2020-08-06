const { Text, Relationship, Checkbox } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { DEFAULT_LIST_ACCESS } = require('../lib/access');

module.exports = function(keystone) {
  keystone.createList('Talk', {
    access: DEFAULT_LIST_ACCESS,
    fields: {
      name: { type: Text },
      event: { type: Relationship, ref: 'Event.talks' },
      speakers: { type: Relationship, ref: 'User.talks', many: true },
      isLightningTalk: { type: Checkbox },
      description: { type: Wysiwyg },
    },
  });
};
