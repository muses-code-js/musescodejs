const { Text, Select, DateTime, Integer, Relationship, Checkbox } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { DEFAULT_LIST_ACCESS } = require('../lib/access');

module.exports = function(keystone) {
  keystone.createList('Event', {
    access: DEFAULT_LIST_ACCESS,
    fields: {
      name: { type: Text },
      status: { type: Select, options: 'draft, active', defaultValue: 'draft' },
      startTime: { type: DateTime },
      durationMins: { type: Integer },
      description: { type: Wysiwyg },
      talks: { type: Relationship, ref: 'Talk.event', many: true },
      locationAddress: { type: Text },
      locationDescription: { type: Text },
      maxRsvps: { type: Integer, defaultValue: 120 },
      isRsvpAvailable: { type: Checkbox, defaultValue: true },
    },
  });
};
