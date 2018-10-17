Package.describe({
  name: 'mozfet:accounts-biocryptology',
  summary: 'Biocryptology OpenID Connect for Meteor Accounts.',
  version: '1.0.7',
  git: 'https://github.com/mozfet/meteor-biocryptology.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use([
    'ecmascript',
    'accounts-base',
    'accounts-oauth',
    'mozfet:biocryptology@1.0.6'
  ]);
  api.imply('accounts-base')
  api.mainModule('server.js', 'server')
  api.mainModule('client.js', 'client')
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.6');
  api.use([
    'mozfet:accounts-biocryptology',
    'ecmascript',
    'accounts-base',
    'accounts-oauth',
    'mozfet:biocryptology',
    'velocity:meteor-stubs',
    'meteortesting:mocha'
  ]);
  api.mainModule('server_test.js', 'server')
  api.mainModule('client_test.js', 'client')
});
