// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './userInfo.html'

// on created
Template.userInfo.onCreated(() => {
  const instance = Template.instance()
})

// on rendered
Template.userInfo.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.userInfo.helpers({
  userId() {
    return Meteor.userId()
  }
})

// events
Template.userInfo.events({

  //on click class
  'click .className'(event, instance) {
  }
})

// on destroyed
Template.userInfo.onDestroyed(() => {
  const instance = Template.instance();
})
