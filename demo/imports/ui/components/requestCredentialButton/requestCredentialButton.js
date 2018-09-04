// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import Biocryptology from 'meteor/mozfet:biocryptology'
import './requestCredentialButton.html'

// events
Template.requestCredentialButton.events({

  //on click class
  'click .js-request-credentail-button'(event, instance) {
    console.log('Requesting Credential')
    Biocryptology.requestCredential(null, errorOrResult => {
      console.log('Biocryptology.requestCredential', errorOrResult)
    })
  }
})
