const { Text, CloudinaryImage } = require('@keystonejs/fields');
const { DEFAULT_LIST_ACCESS } = require('../lib/access');
const { cloudinaryAdapter } = require('../lib/cloudinary-adapter');

module.exports = function(keystone) {
  keystone.createLIst('Sponsor', {
    access: DEFAULT_LIST_ACCESS,
    fields: {
      name: { type: Text },
      website: { type: Text },
      logo: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    },
  });
};
