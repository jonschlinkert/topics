
var auth = require('../test/support/auth');
var topics = require('..');

topics('micromatch/micromatch', auth)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
