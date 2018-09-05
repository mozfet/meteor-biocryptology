// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './logoutButton.html'

// events
Template.logoutButton.events({

  //on click class
  'click .js-logout-button'(event, instance) {
    console.log('Logout')
    Meteor.logout()
  }
})
