// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './loginButton.html'

// on created
Template.biocryptologyLoginButton.onCreated(() => {
  const instance = Template.instance()
})

// on rendered
Template.biocryptologyLoginButton.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.biocryptologyLoginButton.helpers({
  helper() {
    const instance = Template.instance();
    return 'help'
  }
})

// events
Template.biocryptologyLoginButton.events({

  //on click class
  'click .js-biocryptology-signin'(event, instance) {

  }
})

// on destroyed
Template.biocryptologyLoginButton.onDestroyed(() => {
  const instance = Template.instance();
})
