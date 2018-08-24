# meteor-biocryptology

Login with Biocryptology on Meteor.

## Installation

Use the command line terminal in your project directory.
```
$ meteor add accounts-base
$ meteor add mozfet:accounts-biocryptology
```

## Configuration

The following configuration items are available:
* loginStyle: optional - 'popup' (default) or 'redirect'
* clientId: OIDC client identifier
* secret: OIDC client shared secret
* userFields: A optional list of fields to be added to Meteor.user().services.biocryptology. Defaults to 'email_verified'.

Create ```settings-developement.json``` and ```settings-production.json``` in app project folder. Use sandbox clientId and secret in ```settings-developement.json```. Use live clientId and secret in ```settings-developement.json```. Do not upload ```settings-production.json``` unencrypted to source code repositories for security reasons.

```json
"biocryptology": {
  "loginStyle":  "popup",
  "clientId": "my-client-id",
  "secret": "my-client-secret",
  "claims": ["email_verified", "name", "surname"]
}
```

## Usage

In your client code:
```js
Meteor.loginWithBiocryptology()
```
