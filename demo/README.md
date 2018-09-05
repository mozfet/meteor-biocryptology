# How to use the Meteor Biocryptology Demo Application

1. Deploy app to a server, it does not work on local host due to callbacks.
2. Setup plugin on [Biocryptology sandbox](https://id.sb.biocryptology.net/).
Loging to sandbox profile for test user HANSCANA HANSSA.
3. Click on Plug-ins in left side menu. Click on 'ADD PLUGIN' button.
4. Add the callback URL to the plugin, e.g. ```https://biocryptology.eu.meteorapp.com/_oauth/biocryptology```
5. Tick the generate a secret checkbox.
6. Save the plugin, open it again and retrieve the secret and the client id.
7. Add the secret and client id to settings-development
8. Deploy meteor app to your host.
5. Open a browser and point it to root url e.g.```https://biocryptology.eu.meteorapp.com```

# Example settings-production.json

This is an example settings file for deploying to Galaxy.
```
{
  "galaxy.meteor.com": {
     "env": {
       "MONGO_URL": "MONGO-DB-URI"
     }
   },
  "biocryptology": {
    "loginStyle":  "popup",
    "clientId": "YOUR-PLUGIN-CLIENT-ID",
    "secret": "YOUR-PLUGIN-SECRET",
    "claims": ["email_verified", "name", "surname"],
    "callbackUrl": "https://biocryptology.eu.meteorapp.com/_oauth/biocryptology"
  }
}
```
