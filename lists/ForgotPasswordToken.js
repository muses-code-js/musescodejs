const { DateTime, Text, Relationship } = require('@keystonejs/fields');
const { access } = require('../lib/access');

module.exports = function(keystone) {
  keystone.createList('ForgotPasswordToken', {
    fields: {
      user: {
        type: Relationship,
        ref: 'User',
        access: {
          read: access.userIsAdmin,
        },
      },
      token: {
        type: Text,
        isRequired: true,
        isUnique: true,
        access: {
          read: access.userIsAdmin,
        },
      },
      requestedAt: { type: DateTime, isRequired: true },
      accessedAt: { type: DateTime },
      expiresAt: { type: DateTime, isRequired: true },
    },
  });

  keystone.extendGraphQLSchema({
    mutations: [
      {
        schema: 'startPasswordRecovery(email: String!): String',
        resolver: () => {
          return 'hello';
        },
      },
    ],
  });
};
