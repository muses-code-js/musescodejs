require('dotenv').config();

// Lets not hardcode password, even for test data
const password = process.env.INITIAL_DATA_PASSWORD;
const PASSWORD_MIN_LENGTH = 8;

// You can force a re-init in development with the RECREATE_DATABASE
// environment variable.
const shouldRecreateDatabase = () =>
  process.env.NODE_ENV !== 'production' && process.env.RECREATE_DATABASE;

const validatePassword = () => {
  if (!password) {
    throw new Error(`To seed initial data, set the 'INITIAL_DATA_PASSWORD' environment variable`);
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `To seed initial data, the 'INITIAL_DATA_PASSWORD' environment variable must be at least ${PASSWORD_MIN_LENGTH} characters`
    );
  }
};

module.exports = async keystone => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise the demo data set.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length || shouldRecreateDatabase()) {
    // Ensure a valid initial password is available to be used
    validatePassword();
    // Drop the connected database to ensure no existing collections remain
    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
    });
    console.log('💾 Creating initial data...');
    await keystone.createItems(initialData);
  }
};

const initialData = {
  User: [
    { name: 'Admin User', email: 'admin@keystonejs.com', isAdmin: true, password },
    {
      name: 'Organiser 1',
      email: 'organiser1@keystonejs.com',
      twitterHandle: '@organiser1',
      password,
    },
    {
      name: 'Organiser 2',
      email: 'organiser2@keystonejs.com',
      twitterHandle: '@organiser2',
      password,
    },
    {
      name: 'Organiser 3',
      email: 'organiser3@keystonejs.com',
      twitterHandle: '@organiser3',
      password,
    },
    {
      name: 'Speaker 1',
      email: 'speaker1@keystonejs.com',
      twitterHandle: '@speaker1',
      password,
    },
    {
      name: 'Speaker 2',
      email: 'speaker2@keystonejs.com',
      twitterHandle: '@speaker2',
      password,
    },
    {
      name: 'Speaker 3',
      email: 'speaker3@keystonejs.com',
      twitterHandle: '@speaker3',
      password,
    },
    {
      name: 'Attendee 1',
      email: 'attendee1@keystonejs.com',
      twitterHandle: `@attendee1`,
      password,
    },
    {
      name: 'Attendee 2',
      email: 'attendee2@keystonejs.com',
      twitterHandle: `@attendee2`,
      password,
    },
    {
      name: 'Attendee 3',
      email: 'attendee3@keystonejs.com',
      twitterHandle: `@attendee3`,
      password,
    },
  ],
  Event: [
    {
      name: 'Free pizza',
      status: 'active',
      // Default to "1 month from now"
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, est et porttitor ultricies, odio nisi consequat arcu, eget ultrices nulla elit in augue. Fusce accumsan mattis felis eget lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent commodo velit id cursus bibendum. Vivamus pellentesque, velit semper ullamcorper ullamcorper, massa mauris laoreet odio, vitae hendrerit orci lacus sit amet augue.',
      durationMins: 150,
      maxRsvps: 120,
      isRsvpAvailable: true,
      locationAddress: 'Worldwide',
    },
    {
      name: 'Fyre Festival',
      status: 'active',
      startTime: new Date(Date.now() + 2000 * 60 * 60 * 24 * 30).toISOString(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, est et porttitor ultricies, odio nisi consequat arcu, eget ultrices nulla elit in augue. Fusce accumsan mattis felis eget lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent commodo velit id cursus bibendum. Vivamus pellentesque, velit semper ullamcorper ullamcorper, massa mauris laoreet odio, vitae hendrerit orci lacus sit amet augue.',
      durationMins: 120,
      maxRsvps: 500,
      isRsvpAvailable: true,
      locationAddress: 'Microsoft Reactor',
    },
    {
      name: 'Javascript Full Day Workshop',
      status: 'active',
      startTime: new Date(Date.now() + 1500 * 60 * 60 * 24 * 30).toISOString(),
      description:
        'We believe that any woman should try programming at least once in their life. There for we created a community where in friendly atmosphere with great vibe you can try programming first time or if you already code - learn something new about JavaScript and/or Node.js. Our full day coding bootcamps are also a great opportunity to grow your network and meet new people with similar interests. Come and join our event for women with lunch provided.',
      durationMins: 150,
      maxRsvps: 200,
      isRsvpAvailable: true,
      locationAddress: 'Microsoft Reactor',
    },
  ],
};