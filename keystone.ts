import { config, list } from '@keystone-6/core';
import {} from '@keystone-6/core';
import { checkbox, image, password, relationship, text } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

// import { sendEmail } from './emails';

import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'email isAdmin',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

let sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

const isRequired = true;

const isAdmin = ({ session: _session }) => _session?.data.isAdmin;
const isUserOrAdmin = ({ session: _session, item }) =>
  _session.data.isAdmin || _session.data.email === item.email;

// Read: public / Write: admin
const DEFAULT_LIST_ACCESS = {
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
};

export default config(
  withAuth({
    // As of writing this, KS only does images at 'local' using this config
    // This will be expanding in the next month and is our highest priority fix
    images: {
      upload: 'local',
      local: {
        storagePath: 'public/images',
        baseUrl: '/images',
      },
    },
    db: {
      provider: 'sqlite', // switch to postgres for deploy
      url: 'file:./keystone-example.db',
    },
    lists: {
      User: list({
        access: {
          item: {
            update: isUserOrAdmin,
            delete: isAdmin,
          },
        },
        fields: {
          name: text(),
          email: text({ isIndexed: 'unique', validation: { isRequired } }),
          password: password({ validation: { isRequired } }),
          isAdmin: checkbox({ access: isAdmin }),
          twitterHandle: text(),
          image: image(),
          talks: relationship({ ref: 'Talk.speakers', many: true, access: { update: isAdmin } }),
        },
        // hooks: {
        //   // send an email saying your password has been updated
        //   afterOperation: async ({ operation, item, originalItem }) => {
        //     if (operation === 'update' && originalItem.password !== item.password) {
        //       const url = process.env.SERVER_URL || 'http://localhost:3000';

        //       const props = {
        //         recipientEmail: item.email,
        //         signinUrl: `${url}/signin`,
        //       };

        //       const options = {
        //         subject: 'Your password has been updated',
        //         to: item,
        //         from: process.env.MAILGUN_FROM,
        //         domain: process.env.MAILGUN_DOMAIN,
        //         apiKey: process.env.MAILGUN_API_KEY,
        //       };

        //       await sendEmail('password-updated.jsx', props, options);
        //     }
        //   },
        // },
      }),
      Talk: list({
        access: {
          item: DEFAULT_LIST_ACCESS,
        },
        fields: {
          name: text(),
          speakers: relationship({ ref: 'User.talks', many: true }),
          isLightningTalk: checkbox(),
          description: document({
            formatting: true,
            dividers: true,
            links: true,
            layouts: [
              [1, 1],
              [1, 1, 1],
            ],
          }),
        },
      }),
    },
    session,
    ui: {
      isAccessAllowed: (context) => context?.session?.data?.isAdmin,
    },
  })
);
