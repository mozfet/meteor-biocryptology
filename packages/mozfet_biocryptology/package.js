Package.describe({
  name: 'mozfet:biocryptology',
  summary: 'OpenID Connect flow implementation for Biocryptology on Meteor.',
  version: '0.0.2',
  git: 'https://github.com/mozfet/meteor-biocryptology.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use([
    'ecmascript',
    'http',
    'ejson',
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
    'jquery',
    'service-configuration',
    'random',
    'underscore',
    'velocity:meteor-stubs',
    'meteortesting:mocha'
  ]);
  api.mainModule('server_test.js', 'server')
  api.mainModule('client_test.js', 'client')
});
