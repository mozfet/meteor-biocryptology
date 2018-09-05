Package.describe({
  name: 'mozfet:biocryptology',
  summary: 'OpenID Connect flow implementation for Biocryptology on Meteor.',
  version: '1.0.4',
  git: 'https://github.com/mozfet/meteor-biocryptology.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use([
    'ecmascript',
    'http',
    'ejson',
    'accounts-base',
    'oauth2',
    'oauth',
    'random',
    'underscore',
    'service-configuration'
  ]);
  api.mainModule('server.js', 'server')
  api.mainModule('client.js', 'client')
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use([
    'mozfet:biocryptology',
    'ecmascript',
    'http',
    'ejson',
    'oauth',
    'oauth2',
    'jquery',
    'service-configuration',
    'random',
    'underscore',
    'webapp',
    'velocity:meteor-stubs',
    'meteortesting:mocha'
  ]);
  api.mainModule('server_test.js', 'server')
  api.mainModule('client_test.js', 'client')
});
