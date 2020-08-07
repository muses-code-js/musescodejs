const { DateTime, Text, Relationship } = require('@keystonejs/fields');
const { gql } = require('apollo-server-express');
const uuid = require('uuid/v4');
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
        schema: 'startPasswordRecovery(email: String!): Boolean',
        resolver: async (obj, { email }, context) => {
          const token = uuid();
          const tokenExpiration =
            parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY) || 1000 * 60 * 60 * 24;
          const now = Date.now();
          const requestedAt = new Date(now).toISOString();
          const expiresAt = new Date(now + tokenExpiration).toISOString();

          const { data: userData, errors: userError } = await context.executeGraphQL({
            query: gql`
              query findUserByEmail($email: String) {
                allUsers(where: { email: $email }) {
                  id
                  name
                }
              }
            `,
            variables: { email },
          });

          if (userError) {
            console.error(
              userError,
              `Unable to find user when trying to create forgotten password token.`
            );
            return false;
          }

          const userId = userData.allUsers[0].id;

          const result = {
            userId,
            token,
            requestedAt,
            expiresAt,
          };

          const { errors } = await context.executeGraphQL({
            mutation: gql`
              mutation createForgotPasswordToken(
                $userId: ID!
                $token: String
                $requestedAt: DateTime
                $expiresAt: DateTime
              ) {
                createForgotPasswordToken(
                  data: {
                    user: { connect: { id: $userId } }
                    token: $token
                    requestedAt: $requestedAt
                    expiresAt: $expiresAt
                  }
                ) {
                  id
                  token
                  user {
                    id
                  }
                  requestedAt
                  expiresAt
                }
              }
            `,
            variables: { result },
          });

          if (errors) {
            console.error(errors, `Unable to create forgotten password token.`);
            return false;
          }

          return true;
        },
      },
    ],
  });
};
