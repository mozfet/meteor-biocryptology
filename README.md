# meteor-biocryptology

An OpenID Connect implementation for account login using Biocryptology.com on Meteor.

## Authorization

https://is.sb.biocryptology.net/V1/auth?client_id=1808160234578578bPGHzsTMKekYyE&response_type=token&nonce=asas&redirect_uri=http%3A%2F%2F105.227.223.70%3A3000%2F_oauth%2Fbiocryptology&state=eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJubUJfOERkc0M0MjlRTFM0U2JmUVBHbFZDanM4ajR0X21uYjZGSjBjMktHIiwiaXNDb3Jkb3ZhIjpmYWxzZX0%3D&scope=openid&display=popup&loginStyle=popup

## Project configuration

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

Using the command line terminal in the project folder:
```
$ meteor add service-configuration
```

In server startup code:
```
if (Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'biocryptology' },
      {
        $set: Meteor.settings.biocryptology
      }
    );
  });
}
```

## Testing

Install test frameworks
```
$ meteor npm install
```

Run tests
```
$ meteor npm run test
```

For client side tests open browser and point it to ```localhost:3000```

## Test Application

Create minimal Meteor app and add account packages:
```
$ meteor create --minimal testApp
$ cd testApp
$ meteor add accounts-base
$ meteor add mozfet:biocryptology
```

Create ```settings-developement.json``` and ```settings-production.json``` in app project folder. Do not upload ```settings-production.json``` unencrypted to source code repositories for security reasons. The clientId and secret listed here is that of ExpertBox.com as per current in the sandbox, it may change and you should replace them with your own for your plugin on the sandbox and production.
```json
{
  "biocryptology": {
    "loginStyle":  "popup",
    "clientId": "1808160234578578bPGHzsTMKekYyE",
    "secret": "9oRWHARUFoc62",
    "userFields": ["email_verified", "name", "surname"]
  }
}
```
