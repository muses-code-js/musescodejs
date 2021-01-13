require('dotenv').config();
const { createItems } = require('@keystonejs/server-side-graphql-client');

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

module.exports = async (keystone) => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise the demo data set.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length || shouldRecreateDatabase()) {
    // Ensure a valid initial password is available to be used
    validatePassword();
    // Drop the connected database to ensure no existing collections remain
    Object.values(keystone.adapters).forEach(async (adapter) => {
      await adapter.dropDatabase();
    });
    // eslint-disable-next-line no-console
    console.log('💾 Creating initial data...');
    await seedData(initialData, keystone);
  }
};

async function seedData(intitialData, keystone) {
  /* 1. Insert the data which has no associated relationships
   * 2. Insert the data with the required relationships using connect
   */

  const users = await createItems({
    keystone,
    listKey: 'User',
    items: initialData['User'].map((x) => ({ data: x })),
    // name field is required for connect query for setting up Organiser list
    returnFields: 'id, name',
  });

  await Promise.all(
    ['Post', 'Event', 'Talk', 'Rsvp', 'Sponsor'].map((list) =>
      createItems({ keystone, listKey: list, items: intitialData[list].map((x) => ({ data: x })) })
    )
  );

  // Preparing the Organiser list with connect nested mutation
  const organisers = Array(3).fill(true).map(createOrganisers(users));

  // Run the GraphQL query to insert all the organisers
  await createItems({ keystone, listKey: 'Organiser', items: organisers });
}

function createOrganisers(users) {
  return (_, i) => {
    console.log('_, i', _, i);
    return {
      data: {
        order: i + 1,
        role: 'Organiser',
        user: {
          connect: { id: users.find((user) => user.name === `Organiser ${i + 1}`).id },
        },
      },
    };
  };
}

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
      slug: 'free-pizza',
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
      slug: 'fyre-festival',
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
      slug: 'javascript-full-day-workshop',
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
  Post: [
    {
      title: 'First Post',
      slug: 'first-post',
      date: '2020-04-23',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in lorem eget risus convallis ultricies sed ut orci. Pellentesque euismod eleifend metus at pharetra. Phasellus imperdiet, dolor vel dapibus tempor, felis nibh facilisis nisi, nec congue enim ex ac neque. Curabitur et libero ut odio consequat luctus. Mauris non ex consectetur, semper risus eu, aliquet leo. Aliquam erat volutpat. Vestibulum eget consequat orci. Morbi ultricies diam euismod dui ornare, convallis tempus neque mollis.Praesent eleifend, nulla a varius pretium, libero nisl vestibulum orci, at maximus turpis odio at quam. Praesent aliquet egestas mauris, ut varius erat tincidunt at. Integer in lacus eu diam porttitor posuere. Curabitur quis lorem non nunc efficitur feugiat tempor ut odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur massa magna, pretium sed nisl ac, porta dignissim urna. Etiam enim eros, consectetur sed lacus et, commodo mattis leo. Proin malesuada ligula ut enim posuere sagittis.',
    },
    {
      title: 'Second Post',
      slug: 'second-post',
      date: '2020-05-05',
      description: `<h1><span style="color: #236fa1;">First Paragraph&nbsp;</span></h1>
        <p><span style="color: #000000;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in lorem eget risus convallis ultricies sed ut orci. Pellentesque euismod eleifend metus at pharetra. Phasellus imperdiet, dolor vel dapibus tempor, felis nibh facilisis nisi, nec congue enim ex ac neque. Curabitur et libero ut odio consequat luctus. Mauris non ex consectetur, semper risus eu, aliquet leo. Aliquam erat volutpat. Vestibulum eget consequat orci. Morbi ultricies diam euismod dui ornare, convallis tempus neque mollis.</span></p>
        <ul>
        <li>Praesent eleifend,</li>
        <li>Quisque in.</li>
        </ul>
        <h2><span style="color: #ba372a;">Second Paragraph</span></h2>
        <p>Suspendisse potenti. Suspendisse nec est nunc. Nunc eu sodales est. Integer eu sem sodales, commodo enim eu, tincidunt est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Donec at condimentum lectus. Integer pellentesque nec velit vel pretium. Etiam sollicitudin malesuada arcu in elementum. In nec ullamcorper dui, id eleifend sem. Sed varius luctus dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce lacinia quam diam, a dapibus sem faucibus a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>`,
    },
  ],
  Talk: [{ name: 'Introducing Keystone 5 🎉' }, { name: 'Keystone 5 - Under the hood' }],
  Rsvp: [],
  Sponsor: [{ name: 'Thinkmill', website: 'www.thinkmill.com.au' }],
};
