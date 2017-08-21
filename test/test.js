'use strict';

require('mocha');
var assert = require('assert');
var auth = require('./support/auth');
var topics = require('..');
var original;
var fixtures = {
  put: ['glob', 'glob-pattern', 'glob-matching', 'matcher', 'bash', 'extended-globs', 'javascript', 'multimatch', 'minimatch', 'regex', 'regular-expression', 'extglob', 'globbing', 'wildmat', 'nodejs'],
  patch: ['match', 'matching']
};

describe('topics', function() {
  before(function() {
    return topics.get('micromatch/micromatch', auth)
      .then(function(results) {
        original = Object.assign({}, results);
      });
  });

  after(function() {
    var opts = Object.assign({}, original, auth);
    return topics.put('micromatch/micromatch', opts);
  });

  it('should export a function', function() {
    assert.equal(typeof topics, 'function');
  });

  it('should export a .get method', function() {
    assert.equal(typeof topics.get, 'function');
  });

  it('should export a .put method', function() {
    assert.equal(typeof topics.put, 'function');
  });

  it('should export a .patch method', function() {
    assert.equal(typeof topics.patch, 'function');
  });

  it('should throw an error when invalid args are passed', function() {
    return topics()
      .catch(function(err) {
        assert(err);
      });
  });

  describe('main export', function() {
    it('should return "bad credentials" when auth is bad', function() {
      this.timeout(10000);

      var opts = {
        username: 'bad',
        password: 'credentials'
      };
      return topics('micromatch/micromatch', opts)
        .then(function(res) {
          var expected = {
            message: 'Bad credentials',
            documentation_url: 'https://developer.github.com/v3'
          };
          if (res.message === 'Maximum number of login attempts exceeded. Please try again later.') {
            return;
          }

          assert.deepEqual(res, expected);
        });
    });
  });

  describe('.get', function() {
    it('should return "bad credentials" when auth is bad', function() {
      this.timeout(10000);

      var opts = {
        username: 'bad',
        password: 'credentials'
      };
      return topics.get('micromatch/micromatch', opts)
        .then(function(res) {
          var expected = {
            message: 'Bad credentials',
            documentation_url: 'https://developer.github.com/v3'
          };
          if (res.message === 'Maximum number of login attempts exceeded. Please try again later.') {
            return;
          }
          assert.deepEqual(res, expected);
        });
    });

    it('should take owner and repo on options', function() {
      this.timeout(5000);

      var options = {
        username: auth.username,
        password: auth.password,
        owner: 'micromatch',
        repo: 'micromatch'
      };

      return topics.get(options)
        .then(function(res) {
          assert(Array.isArray(res.names));
          assert(res.names.length > 1);
        });
    });
  });

  describe('.put', function() {
    it('should overwrite topics', function() {
      this.timeout(5000);

      var options = {
        username: auth.username,
        password: auth.password,
        owner: 'micromatch',
        repo: 'micromatch',
        names: fixtures.put.slice()
      };

      return topics.put(options)
        .then(function() {
          return topics('micromatch/micromatch', auth)
            .then(function(res) {
              assert.deepEqual(res, {names: fixtures.put.slice()});
            });
        });
    });
  });

  describe('.patch', function() {
    it('should overwrite topics', function() {
      this.timeout(5000);

      var options = {
        username: auth.username,
        password: auth.password,
        owner: 'micromatch',
        repo: 'micromatch',
        names: fixtures.patch.slice()
      };

      return topics.patch(options)
        .then(function() {
          return topics('micromatch/micromatch', auth)
            .then(function(res) {
              assert.deepEqual(res, {
                names: fixtures.put.slice().concat(fixtures.patch.slice())
              });
            });
        });
    });
  });
});
