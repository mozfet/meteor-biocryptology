# How to use the Meteor Biocryptology Demo Application

1. Ensure you have an fixed inbound IP and open port, in my case my callbackUrl is:
https://160.226.132.146:3200/_oauth/biocryptology.
2. Setup plugin on [Biocryptology sandbox](https://id.sb.biocryptology.net/).
Loging to sandbox profile for test user HANSCANA HANSSA.
Click on Plug-ins in left side menu. Click on 'ADD PLUGIN' button.
3. Change settings-development to reflect your callbackUrl.
4. Run the demo app, from this folder:
```
$ meteor --port 3200 --settings settings-development.json
```
5. Open a browser and point it to ```localhost:3200```
