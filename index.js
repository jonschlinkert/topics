'use strict';

var GitHub = require('github-base');
var isObject = require('isobject');
var union = require('arr-union');

/**
 * List all topics for a repository. The main export is a function that
 * calls the [.get](#get) method.
 *
 * ```js
 * var options = {
 *   username: 'your_username',
 *   password: 'your_password'
 * };
 *
 * topics('micromatch/micromatch', options)
 *   .then(function(topics) {
 *     console.log('topics', topics);
 *   })
 *   .catch(console.error)
 * ```
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

function topics(owner, repo, options) {
  return topics.request('get', owner, repo, options);
}

/**
 * Create a topics request with the given `method`, `owner`, `repo`
 * and `options`.
 *
 * ```js
 * var options = {
 *   username: 'your_username',
 *   password: 'your_password'
 * };
 *
 * topics.request('get', 'micromatch', 'micromatch', options)
 *   .then(function(topics) {
 *     console.log('topics', topics);
 *   })
 *   .catch(console.error)
 * ```
 * @param {String} `method`
 * @param {String} `owner`
 * @param {String} `repo`
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

topics.request = function(method, owner, repo, options) {
  if (typeof owner === 'undefined') {
    return Promise.reject(new TypeError('expected a string or object'));
  }

  // opts for `new GitHub` and opts for `put`
  // need to have separate keys to work correctly
  var opts = normalize(owner, repo, options);
  var data = {names: arrayify(opts.names)};
  delete opts.names;

  var github = new GitHub(opts);
  var config = Object.assign({}, opts, data);

  return new Promise(function(resolve, reject) {
    github[method]('/repos/:owner/:repo/topics', config, function(err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

/**
 * List all topics for a repository.
 *
 * ```js
 * var options = {
 *   username: 'your_username',
 *   password: 'your_password'
 * };
 *
 * topics.get('micromatch/micromatch', options)
 *   .then(function(topics) {
 *     console.log('topics', topics);
 *   })
 *   .catch(console.error)
 * ```
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

topics.get = function(owner, repo, options) {
  return topics.request('get', owner, repo, options);
};

/**
 * Replace all topics for a repository.
 *
 * ```js
 * var options = {
 *   username: 'your_username',
 *   password: 'your_password',
 *
 *   // new topics to use (overwrites all existing topics)
 *   names: [
 *     'foo',
 *     'bar',
 *     'baz'
 *   ]
 * };
 *
 * topics.put('micromatch/micromatch', options)
 *   .then(function(topics) {
 *     console.log('topics', topics);
 *   })
 *   .catch(console.error)
 * ```
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

topics.put = function(owner, repo, options) {
  return topics.request('put', owner, repo, options);
};

/**
 * Get all topics for a repository and then patch them to include
 * the given `options.names`.
 *
 * ```js
 * var options = {
 *   username: 'your_username',
 *   password: 'your_password',
 *
 *   // new topics to use (overwrites all existing topics)
 *   names: [
 *     'foo',
 *     'bar',
 *     'baz'
 *   ]
 * };
 *
 * topics.put('micromatch/micromatch', options)
 *   .then(function(topics) {
 *     console.log('topics', topics);
 *   })
 *   .catch(console.error)
 * ```
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

topics.patch = function(owner, repo, options) {
  return topics.get(owner, repo, options)
    .then(function(res) {
      if (res.message && /invalid/i.test(res.message)) {
        return Promise.resolve(res);
      }

      var opts = normalize(owner, repo, options);
      opts.names = union([], res.names, opts.names);
      return topics.put(opts);
    });
};

function normalize(owner, repo, options) {
  if (isObject(repo)) {
    options = repo;
    var segs = owner.split('/');
    owner = segs.shift();
    repo = segs.pop();
  } else if (isObject(owner)) {
    options = owner;
    owner = null;
    repo = null;
  }

  var defaults = {
    headers: {
      accept: 'application/vnd.github.mercy-preview+json'
    },
    owner: owner,
    repo: repo
  };

  return Object.assign({}, defaults, options);
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `topics`
 */

module.exports = topics;
