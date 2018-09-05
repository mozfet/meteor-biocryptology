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

## Testing
Testing includes unit and integration tests.

Install test frameworks
```
$ meteor npm install
```

Run tests
```
$ meteor npm run test
```

In order to run demo from any local machine even behind a firewall without screwing about with HTTPS certs, ect, we are going to tunnel to local host.

1. Open an [ngrok](ngrok.com) acount and install the binary in your user folder.
3. Open a new terminal and run ```~/ngrok http 3000```
4. Copy the forwarding https address from ngrok session info, e.g. ```http://2e7e83d5.ngrok.io```
5. Edit client_test_stubs and change the ServiceConfiguration stub callbackUrl to start with the ngrok https forwarding address, e.g.:
```
https://e77cd7b7.ngrok.io/_oauth/biocrpytology
```
5. Go to [Biocryptology sandbox](https://is.sb.biocryptology.net/).
6. Click on link device button. The generate result button appears. Click on generate result button.
7. The sandbox profile for test user HANSCANA HANSSA is shown. Click on Plug-ins in left side menu. Click on 'ADD PLUGIN' button.
8. Add an Icon (100kb seems to be the max size). Enter your projects name as the description. Specify the the callbackURL as per step 5, and save.
9. Open browser and point it to ```localhost:3000```

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
OATH2 Implicit Flow? VS OpenId Connect?

Demo Auth Request
https://is.sb.biocryptology.net/V1/auth?client_id=1809040824169161LhyBYDM3Z4441u&response_type=code&nonce=aILaN0rQQUKRr5eopvJ6uFjHXWezn_wfiGwxXTIfprV&redirect_uri=http%3A%2F%2F160.226.132.146%3A3200%2F_oauth%2Fbiocryptology&state=eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJhSUxhTjByUVFVS1JyNWVvcHZKNnVGakhYV2V6bl93ZmlHd3hYVElmcHJWIiwiaXNDb3Jkb3ZhIjpmYWxzZX0%3D&scope=email%20openid&claims=%7B%22userinfo%22%3A%7B%22given_name%22%3A%7B%22essential%22%3Atrue%7D%2C%22family_name%22%3A%7B%22essential%22%3Atrue%7D%2C%22prefered_username%22%3A%7B%22essential%22%3Atrue%7D%2C%22locale%22%3A%7B%22essential%22%3Atrue%7D%7D%2C%22id_token%22%3A%7B%22auth_time%22%3A%7B%22essential%22%3Atrue%7D%7D%7D

Demo Auth Response
http://160.226.132.146:3200/_oauth/biocryptology?state=eyJsb2dpblN0eWxlIjoicG9wdXAiLCJjcmVkZW50aWFsVG9rZW4iOiJhSUxhTjByUVFVS1JyNWVvcHZKNnVGakhYV2V6bl93ZmlHd3hYVElmcHJWIiwiaXNDb3Jkb3ZhIjpmYWxzZX0%3D&code=pH-arMcPM8NVfqaMWvr5dQ
