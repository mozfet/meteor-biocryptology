import {Accounts} from 'meteor/accounts'
import Biocryptology from 'meteor/mozfet:biocryptology'

Accounts.oauth.registerService('biocryptology')

Accounts.addAutopublishFields({
  // not sure whether the OIDC api can be used from the browser,
  // thus not sure if we should be sending access tokens; but we do it
  // for all other oauth2 providers, and it may come in handy.
  forLoggedInUser: ['services.biocryptology'],
  forOtherUsers: ['services.biocryptology.id']
});
