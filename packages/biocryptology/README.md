# meteor-biocryptology

An OpenID Connect implementation for account login using Biocryptology.com on Meteor.

This package implements the Biocryptology OpenId flow and is designed for use together with the ```mozfet:biocryptology-accounts``` package for integration
with Meteor Accounts.

## Installation
Using command line terminal, in your application's project folder
```
$ meteor add mozfet:biocryptology
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
  "userFields": ["name", "surname"]
}
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
