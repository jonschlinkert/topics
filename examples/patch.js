
var auth = require('../test/support/auth');
var topics = require('..');

var opts = Object.assign({}, auth, {names: ['nodejs']});

topics.patch('micromatch', 'micromatch', opts)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
