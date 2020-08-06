const {
  CloudinaryImage,
  Checkbox,
  DateTime,
  Integer,
  Password,
  Relationship,
  Select,
  Text,
} = require('@keystonejs/fields');
const { access } = require('../lib/access');
const { cloudinaryAdapter } = require('../lib/cloudinary-adapter');

module.exports = function(keystone) {
  keystone.createList('User', {
    fields: {
      name: { type: Text },
      email: { type: Text, isUnique: true, access: { read: access.userIsCurrentAuth } },
      password: { type: Password, isRequired: true },
      isAdmin: { type: Checkbox, access: { update: access.userIsAdmin } },
      twitterHandle: { type: Text },
      image: { type: CloudinaryImage, adapter: cloudinaryAdapter },
      talks: {
        type: Relationship,
        ref: 'Talk.speakers',
        many: true,
        access: { update: access.userIsAdmin },
      },
    },
    hooks: {
      afterChange: async ({ updatedItem, existingItem }) => {
        if (existingItem && updatedItem.password !== existingItem.password) {
          const url = process.env.SERVER_URL || 'http://localhost:3000';

          const props = {
            recipientEmail: updatedItem.email,
            signinUrl: `${url}/signin`,
          };

          const options = {
            subject: 'Your password has been updated',
            to: updatedItem,
            from: process.env.MAILGUN_FROM,
            domain: process.env.MAILGUN_DOMAIN,
            apiKey: process.env.MAILGUN_API_KEY,
          };

          await sendEmail('password-updated.jsx', props, options);
        }
      },
    },
  });
};
