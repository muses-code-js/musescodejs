const { Relationship, Select } = require('@keystonejs/fields');

module.exports = function(keystone) {
  keystone.createList('Rsvp', {
    access: {
      create: true,
      read: true,
      update: ({ authentication: { item } }) => {
        if (!item) {
          return false;
        }
        return { user: { id: item.id } };
      },
      delete: access.userIsAdmin,
    },
    fields: {
      event: { type: Relationship, ref: 'Event' },
      user: { type: Relationship, ref: 'User' },
      status: { type: Select, options: 'yes, no' },
    },
    hooks: {
      validateInput: async ({ resolvedData, existingItem, actions }) => {
        const { status } = resolvedData;
        const { event: eventId } = existingItem ? existingItem : resolvedData;

        if (status === 'no') {
          return;
        }

        const { data } = await actions.query(`query {
                event: Event(where: { id: "${eventId}" }) {
                  id
                  startTime
                  maxRsvps
                  isRsvpAvailable
                }
                allRsvps(where: { event: { id: "${eventId}" }}) {
                  id
                }
              }`);

        const { event, allRsvps } = data;

        if (
          !event ||
          !event.isRsvpAvailable ||
          !event.startTime ||
          new Date() > new Date(event.startTime) ||
          allRsvps.length >= event.maxRsvps
        ) {
          throw 'Error rsvping to event';
        }
      },
    },
  });
};
