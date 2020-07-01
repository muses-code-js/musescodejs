require('dotenv').config();

const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { NextApp } = require('@keystone-alpha/app-next');

const { Text, Checkbox, Password } = require('@keystonejs/fields');

const {
  Event,
  Talk,
  User,
  Rsvp,
  Organiser,
  Sponsor,
  SponsorRequest,
  Post,
  ForgottenPasswordToken,
} = require('./schema');

const initialiseData = require('./initialData');

const keystone = new Keystone({
  name: 'MusesCodeJS',
  adapter: new MongooseAdapter(),
  onConnect: initialiseData,
});

keystone.createList('Event', Event);
keystone.createList('Rsvp', Rsvp);
keystone.createList('Talk', Talk);
keystone.createList('User', User);
keystone.createList('Organiser', Organiser);
keystone.createList('Sponsor', Sponsor);
keystone.createList('SponsorRequest', SponsorRequest);
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.createList('Post', Post);

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
      children: ['Event', 'Talk', 'Organiser', 'Post'],
    },
    {
      label: 'People',
      children: ['User', 'Rsvp'],
    },
    {
      label: 'Sponsorship',
      children: ['Sponsor', 'SponsorRequest'],
    },
  ],
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), adminApp, new NextApp({ dir: 'site' })],
};
