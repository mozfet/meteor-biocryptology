# meteor-biocryptology

Biocryptology OpenID Connect for Meteor Accounts.

This package is designed for use with the ```mozfet:biocryptology``` package which contains the Biocryptology OpenID Connect flow.

## Installation
Using command line terminal, in your application's project folder
```
$ meteor add accounts-core
$ meteor add mozfet:accounts-biocryptology
```

## Configuration

The following configuration items are available:
* loginStyle: optional - 'popup' (default) or 'redirect'
* clientId: OIDC client identifier
* secret: OIDC client shared secret
* userFields: A optional list of fields to be added to Meteor.user().services.biocryptology. Defaults to 'email_verified'.

In Meteor settings.json add server side only key:
```
"biocryptology": {
  "loginStyle":  "popup",
  "clientId": "my-client-id",
  "secret": "my-client-secret",
  "claims": ["email_verified", "name", "surname"]
}
```

## Usage

In client side code:
```js
Meteor.loginWithBiocryptology()
```

## Unit Testing

Install test frameworks
```
$ meteor npm install
```

Run tests
```
$ meteor npm run test
```

For client side tests open browser and point it to ```localhost:3000```

## Integration Testing

No local development environment integration testing is currently possible due to limitations with the Biocryptology sandbox.

## Publish to Atmosphere

Using command line terminal in this directory.
```
$ meteor publish
```

## Licence

MIT - See <LICENCE> file in this directory.
