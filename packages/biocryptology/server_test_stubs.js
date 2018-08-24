import Sinon from 'sinon'

// stub meteor settings
Meteor.settings = {
  biocryptology: {
    loginStyle: 'popup',
    clientId: '1808160234578578bPGHzsTMKekYyE',
    secret: '9oRWHARUFoc62',
    claims: ['email_verified', 'name', 'surname']
  }
}
