require('dotenv').config();

const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { NextApp } = require('@keystone-alpha/app-next');

const {
  Event,
  Talk,
  User,
  Rsvp,
  Organiser,
  Sponsor,
  Post,
  ForgottenPasswordToken,
  Volunteer,
  Enquiry
} = require('./schema');

const keystone = new Keystone({
  name: 'MusesCodeJS',
  adapter: new MongooseAdapter(), 
});

keystone.createList('Event', Event);
keystone.createList('Rsvp', Rsvp);
keystone.createList('Talk', Talk);
keystone.createList('User', User);
keystone.createList('Organiser', Organiser);
keystone.createList('Sponsor', Sponsor);
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.createList('Post', Post);
keystone.createList('Volunteer', Volunteer);
keystone.createList('Enquiry', Enquiry);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

const adminApp = new AdminUIApp({
  adminPath: '/admin',
  authStrategy,
  pages: [
    {
      label: 'Meetup',
      children: ['Event', 'Talk', 'Organiser', 'Sponsor', 'Post', 'Volunteer'],
    },
    {
      label: 'People',
      children: ['User', 'Rsvp', 'Enquiry'],
    },
  ],
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), adminApp, new NextApp({ dir: 'site' })],
};
