# MusesCodeJS

Project [link](https://www.notion.so/thinkmill/405b8f494d804fa48377362c1316e79d?v=8e5c965fde9846329b251f7a5ed1ecb5)

A free, open source website. Powered by [Keystone 5](https://www.keystonejs.com/), [Next.js](https://nextjs.org/) and [Emotion](https://emotion.sh/).

Note: This is a work in progress and we'd love your contributions. Please see the read the issues and [contributing guidelines](CONTRIBUTING.md) if you'd like to help make this project better.

## Requirements to run locally
Before we start, check that your computer or server meets the following requirements:

Node.js >= 10.x: Node.js is a server platform which runs JavaScript.
MongoDB >= 4.x: MongoDB is a powerful NoSQL document storage database.

To run locally:

Make sure mongodb-community status is `started` by running `brew services list`.

Run `yarn dev`

### Installing MongoDB

**MacOS**
The simplest way to install MongoDB is using [Homebrew](https://brew.sh/). Refer the [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) for more information.

**Windows**
Follow the [official guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) for installing MongoDB on Windows.

**Other Platforms**
[Downloads](https://www.mongodb.com/download-center/community) and [instructions](https://docs.mongodb.com/manual/administration/install-on-linux/) for installation on various Linux systems are also available.

**Setup**
By default the Mongoose Adapter will attempt to connect to MongoDB as the current user and create a new database using the project name. You can override these options when [configuring the Mongoose Adapter](https://www.keystonejs.com/keystonejs/adapter-mongoose/).