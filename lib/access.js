const access = {
  userIsAdmin: ({ authentication: { item: user } }) => Boolean(user && user.isAdmin),
  userIsCurrentAuth: ({ authentication: { item } }) => {
    if (!item) {
      return false;
    }
    return true;
  },
};

const DEFAULT_LIST_ACCESS = {
  create: access.userIsAdmin,
  read: true,
  update: access.userIsAdmin,
  delete: access.userIsAdmin,
};

module.exports = {
  access,
  DEFAULT_LIST_ACCESS,
};
