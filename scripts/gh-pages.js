
var ghpages = require('gh-pages');

ghpages.publish(require('./build')), {
  branch: 'master',
  repo: 'https://github.com/samogray/githabApi.git'
}, callback);