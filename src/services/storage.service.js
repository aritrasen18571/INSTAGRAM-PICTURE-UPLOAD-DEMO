const ImageKit = require('@imagekit/nodejs');
require("dotenv").config();
const imagekit  = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});

module.exports = imagekit;