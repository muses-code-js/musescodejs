# MusesCodeJS

Project [link](https://github.com/muses-code-js/musescodejs/projects/1)

A free, open source website. Powered by [Keystone 5](https://www.keystonejs.com/), [Next.js](https://nextjs.org/) and [Emotion](https://emotion.sh/).

Note: This is a work in progress and we'd love your contributions. Please see the read the issues and [contributing guidelines](CONTRIBUTING.md) if you'd like to help make this project better.

## Requirements to run locally

Before we start, check that your computer or server meets the following requirements:

Node.js >= 10.x: Node.js is a server platform which runs JavaScript.
MongoDB >= 4.x: MongoDB is a powerful NoSQL document storage database.

To run locally:

Make sure mongodb-community status is `started` by running `brew services list`.

Create a `.env` file based on the example available in this folder (`.env.example`) with the right information or create free accounts for these services.

Make sure you installed all dependencies running `yarn` before start `yarn dev`

Start: `yarn dev`

### Mocking Database

If it's the first time you are running it locally you can mock a DB with initial content you can add the following code inside the `index.js` in the root.

```js
const initialiseData = require('./initialData');

const keystone = new Keystone({
  name: 'MusesCodeJS',
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/muses-code-js' }),
  onConnect: initialiseData,
});
```

### Access Admin Area

Keystone Admin UI: http://localhost:3000/admin
username: admin@keystonejs.com
password: 12345678 (defined on .env file)

### Installing MongoDB

**MacOS**
The simplest way to install MongoDB is using [Homebrew](https://brew.sh/). Refer the [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) for more information.

**Windows**
Follow the [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) for installing MongoDB on Windows.

**Other Platforms**
[Downloads](https://www.mongodb.com/download-center/community) and [instructions](https://docs.mongodb.com/manual/administration/install-on-linux/) for installation on various Linux systems are also available.

**Setup**
By default the Mongoose Adapter will attempt to connect to MongoDB as the current user and create a new database using the project name. You can override these options when [configuring the Mongoose Adapter](https://www.keystonejs.com/keystonejs/adapter-mongoose/).
