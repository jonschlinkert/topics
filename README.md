# topics [![NPM version](https://img.shields.io/npm/v/topics.svg?style=flat)](https://www.npmjs.com/package/topics) [![NPM monthly downloads](https://img.shields.io/npm/dm/topics.svg?style=flat)](https://npmjs.org/package/topics) [![NPM total downloads](https://img.shields.io/npm/dt/topics.svg?style=flat)](https://npmjs.org/package/topics) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/topics.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/topics)

> Get and update GitHub repository topics.

Follow this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), for updates on this project and others.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save topics
```

## Usage

This library uses [github-base](https://github.com/jonschlinkert/github-base). Visit that library's [github repository](https://github.com/jonschlinkert/github-base) for documentation about all available options and authentication options.

```js
var topics = require('topics');
```

**Example response**

Status: 200 OK

```json
{
  "names": [
    "octocat",
    "atom",
    "electron",
    "API"
  ]
}
```

## API

### [topics](index.js#L30)

List all topics for a repository. The main export is a function that calls the [.get](#get) method.

**Params**

* `owner` **{String}**: Either `owner/repo` combination, or `owner` if `repo` is the second argument.
* `repo` **{String|Object}**: Repository name or options.
* `options` **{Object}**
* `returns` **{Promise}**

**Example**

```js
var options = {
  username: 'your_username',
  password: 'your_password'
};

topics('micromatch/micromatch', options)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
```

### [.request](index.js#L58)

Create a topics request with the given `method`, `owner`, `repo` and `options`.

**Params**

* `method` **{String}**
* `owner` **{String}**: Either `owner/repo` combination, or `owner` if `repo` is the second argument.
* `repo` **{String|Object}**: Repository name or options.
* `options` **{Object}**
* `returns` **{Promise}**

**Example**

```js
var options = {
  username: 'your_username',
  password: 'your_password'
};

topics.request('get', 'micromatch', 'micromatch', options)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
```

### [.get](index.js#L109)

List all topics for a repository.

**Params**

* `owner` **{String}**: Either `owner/repo` combination, or `owner` if `repo` is the second argument.
* `repo` **{String|Object}**: Repository name or options.
* `options` **{Object}**
* `returns` **{Promise}**

**Example**

```js
var options = {
  username: 'your_username',
  password: 'your_password'
};

topics.get('micromatch/micromatch', options)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
```

### [.put](index.js#L142)

Replace all topics for a repository.

**Params**

* `owner` **{String}**: Either `owner/repo` combination, or `owner` if `repo` is the second argument.
* `repo` **{String|Object}**: Repository name or options.
* `options` **{Object}**
* `returns` **{Promise}**

**Example**

```js
var options = {
  username: 'your_username',
  password: 'your_password',

  // new topics to use (overwrites all existing topics)
  names: [
    'foo',
    'bar',
    'baz'
  ]
};

topics.put('micromatch/micromatch', options)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
```

### [.patch](index.js#L177)

Gets all topics for a repository and then replaces the existing topics with one or more additional topics defined on `options.names`. Send an empty array (`[]

**Params**

* `owner` **{String}**: Either `owner/repo` combination, or `owner` if `repo` is the second argument.
* `repo` **{String|Object}**: Repository name or options.
* `options` **{Object}**
* `returns` **{Promise}**

**Example**

```js
var options = {
  username: 'your_username',
  password: 'your_password',

  // new topics to use (overwrites all existing topics)
  names: [
    'foo',
    'bar',
    'baz'
  ]
};

topics.patch('micromatch/micromatch', options)
  .then(function(topics) {
    console.log('topics', topics);
  })
  .catch(console.error)
```

### [.normalize](index.js#L202)

Utility for normalizing options. This is already used in
necessary places in the other request methods, but it's exposed for
unit tests and debugging.

**Params**

* `owner` **{String}**
* `repo` **{String}**
* `options` **{String}**
* `returns` **{Object}**: Returns the options object to use with the request methods.

## About

### Related projects

You might also be interested in these projects:

* [github-base](https://www.npmjs.com/package/github-base): JavaScript wrapper that greatly simplifies working with GitHub's API. | [homepage](https://github.com/jonschlinkert/github-base "JavaScript wrapper that greatly simplifies working with GitHub's API.")
* [github-contributors](https://www.npmjs.com/package/github-contributors): Generate a markdown or JSON list of contributors for a project using the GitHub API. | [homepage](https://github.com/jonschlinkert/github-contributors "Generate a markdown or JSON list of contributors for a project using the GitHub API.")
* [github-metadata](https://www.npmjs.com/package/github-metadata): Gather GitHub metadata about a repository. | [homepage](https://github.com/doowb/github-metadata "Gather GitHub metadata about a repository.")
* [github-traffic](https://www.npmjs.com/package/github-traffic): Get the Github traffic for the specified repository | [homepage](https://github.com/doowb/github-traffic "Get the Github traffic for the specified repository")
* [repos](https://www.npmjs.com/package/repos): Pull down a list of GitHub repositories for the specified user or org, and save… [more](https://github.com/jonschlinkert/repos) | [homepage](https://github.com/jonschlinkert/repos "Pull down a list of GitHub repositories for the specified user or org, and save to a local JSON file.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 21, 2017._