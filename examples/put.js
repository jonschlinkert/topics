
var auth = require('../test/support/auth');
var topics = require('..');

var opts = Object.assign({}, auth, {
  names: [
    'glob',
    'glob-pattern',
    'glob-matching',
    'matcher',
    'bash',
    'extended-globs',
    'javascript',
    'multimatch',
    'minimatch',
    'regex',
    'regular-expression',
    'extglob',
    'globbing',
    'wildmat',
    'nodejs'
  ]
});

topics.put('micromatch/micromatch', opts)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
