import Sinon from 'sinon'
import Fiber from 'fibers'

const loginStyle = 'popup'
const clientId = '1808251124098993bdpkmEZm1izMS1'
const secret = 'KBrPGaqhWicmN'
const claims = ['email_verified', 'name', 'surname']
const callbackUrl = 'http://160.226.132.146:3200/_oauth/biocryptology'
const authorization_endpoint = 'https://is.sb.biocryptology.net/V1/auth'

// stub Meteor.settings.biocryptology
Meteor.settings = {
  biocryptology: {loginStyle, clientId, secret, claims, callbackUrl}
}

// stub service configuration
Sinon.stub(ServiceConfiguration.configurations, 'findOne').callsFake(function () {
  return {
    loginStyle, clientId, secret, claims, callbackUrl, authorization_endpoint
  }
})
