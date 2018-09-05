# meteor-biocryptology-demo

Demo Application showing Login with Biocryptology on Meteor.

# See it in action

<div class="video_container">
  <video controls="controls" allowfullscreen="true" poster="path/to/poster_image.png">
    <source src="https://github.com/mozfet/meteor-biocryptology/blob/master/demo/biocryptology_demo.mp4" type="video/mp4">
  </video>
</div>

# Running the demo on localhost

1. Clone this git repository and navigate to this directory on you local machine.
2. Setup plugin on [Biocryptology sandbox](https://id.sb.biocryptology.net/).
Loging to sandbox profile for test user HANSCANA HANSSA.
3. Click on Plug-ins in left side menu. Click on 'ADD PLUGIN' button.
4. Add the callback URL with your local hosts's public IP and an open inbound port to the plugin, e.g. ```http://160.226.132.146:3200/_oauth/biocryptology```
5. Tick the generate a secret checkbox.
6. Save the plugin, open it again and retrieve the secret and the client id.
7. Add the secret and client id to settings-development.json
8. Connect to a VPN from your local machine.
9. Install node dependancies: ```$ meteor npn install```.
10. Start the app ```$ meteor npm run start```.
11. Open a browser and point it to your external ip address and port e.g.```
https://160.226.132.146:3200/```
12. Click on login. A popup should open. Click on link device. Click on generate result. You should be logged in with email

You can revoke the login and force re-authentication on [MyPlaces in the Sandbox](https://id.sb.biocryptology.net/#/user/personal/places). This will not log you out of the demo, but should require new authentication after the auth token  expires, or after the logout button was pressed on the demo.

## Configuration

In ```settings-developement.json```:
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

Note that on a local host environment the callbackUrl must be specified in your settings in order to defined your external IP and an open inbound port where the server is running on your machine; this is not needed for PROD. You will also need to use a VPN in order to run locally so that your external IP resolves for the callback from the authentication server.


## Licence

MIT - See <LICENCE> file in this directory.
