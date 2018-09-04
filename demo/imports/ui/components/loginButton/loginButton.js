// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './loginButton.html'

// events
Template.loginButton.events({

  //on click class
  'click .js-login-button'(event, instance) {
    console.log('Login with Biocryptology')
    Meteor.loginWithBiocryptology()
  }
})
