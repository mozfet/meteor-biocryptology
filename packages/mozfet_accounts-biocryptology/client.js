import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts'
import Biocryptology from 'meteor/mozfet:biocryptology'

Accounts.oauth.registerService('biocryptology')

Meteor.loginWithBiocryptology = function(options, callback) {

  // support a callback without options
  if (! callback && typeof options === "function") {
    callback = options
    options = null
  }

  var credentialRequestCompleteCallback =
    Accounts.oauth.credentialRequestCompleteHandler(callback)
  Biocryptology.requestCredential(options, credentialRequestCompleteCallback)
}
