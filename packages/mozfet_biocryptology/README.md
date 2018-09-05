# meteor-biocryptology

OpenID Connect flow implementation for Biocryptology on Meteor.

This package is designed for use with the ```mozfet:biocryptology-accounts``` package for integration with Meteor Accounts.

# meteor-biocryptology

Login with Biocryptology on Meteor.

## Installation

Use the command line terminal in your project directory.
```
$ meteor add mozfet:accounts-biocryptology
```

## Configuration

Create ```settings-developement.json``` and ```settings-production.json``` in app project folder. Use sandbox clientId and secret in ```settings-developement.json```. Use live clientId and secret in ```settings-developement.json```. Do not upload unencrypted ```settings-production.json``` to source code repositories for security reasons.

In ```settings-developement.json``` add:
```json
{
  "biocryptology": {
    "loginStyle":  "popup",
    "clientId": "your-dev-client-id",
    "secret": "your-dev-secret",
    "scopes": ["email", "openid"],
    "claims": ["given_name", "family_name", "prefered_username", "locale"],
    "callbackUrl": "http://160.226.132.146:3200/_oauth/biocryptology"
  }
}
```
Note that on a local host environment the callbackUrl is needed to defined your external IP and an open inbound port where your DEVC server is running. You will also need to use a VPN in order to run locally so that your external IP resolves for the callback from the authentication server.

In ```settings-production.json``` add:
```
{
  "biocryptology": {
    "loginStyle":  "popup",
    "clientId": "your-prod-client-id",
    "secret": "your-prod-secret",
    "scopes": ["email", "openid"],
    "claims": ["given_name", "family_name", "prefered_username", "locale"]
  }
}
```
Note that in PROD you should not specify the callback URL, it will be detected by automagically by Meteor.

## Usage

Login using client side code:
```js
Meteor.loginWithBiocryptology()
```

Logout using client side code:
```js
Meteor.logout()
```

## Licence

MIT - See <LICENCE> file in this directory.
