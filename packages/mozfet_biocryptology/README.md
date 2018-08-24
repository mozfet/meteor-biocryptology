# meteor-biocryptology

OpenID Connect flow implementation for Biocryptology on Meteor.

This package is designed for use with the ```mozfet:biocryptology-accounts``` package for integration with Meteor Accounts.

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
  "claims": ["email_verified", "name", "surname"]
}
```

## Usage

In client side code:
```js
import { Biocryptology } from 'meteor/mozfet:biocrpytology'
const config = Biocryptology.requestConfig()
Biocryptology.requestCredential(null, errorOrResult => {})
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

## Reference Messages (from Biocryptology OpenId Guide V2.00)

### Bad Claims Example

[CLAIMS] -> using a user claims json to receive only the requested values. http://localhost:8080/V1/auth?client_id=biocryptology&scope=openid&state=170894&redirect_uri=http://biocryptology.net&response_type=token&nonce=asas&claims={"userinfo":{"address":null,"nickname":null,"email":null}}

## Example Messages
https://is.sb.biocryptology.net/V1/auth?client_id=1808160234578578bPGHzsTMKekYyE&response_type=token&nonce=asas&redirect_uri=http%3A%2F%2F105.227.223.70%3A3000%2F_oauth%2Fbiocryptology&state=eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJEUEVxeUhBMjlUSkloNWpLU1laU1I3angwNzBSM3gzdXRBeHJOX1ZvLU1tIiwiaXNDb3Jkb3ZhIjpmYWxzZX0%3D&scope=openid&claims=%7B%22userinfo%22%3A%7B%22email_verified%22%3Anull%2C%22name%22%3Anull%2C%22surname%22%3Anull%7D%7D

request credential cb resultOrError 925aCLzz3qw-9L53Uan3pJgERAx2D-K6Uu-amHzOR9E
