module.exports = {
  createLists(keystone) {
    // require('./ForgotPasswordToken')(keystone);
    require('./User')(keystone);
    require('./Event')(keystone);
    // require('./Organiser')(keystone);
    require('./Talk')(keystone);
    // require('./Rsvp')(keystone);
    // require('./Post')(keystone);
    // require('./Sponsor')(keystone);
  },
};
