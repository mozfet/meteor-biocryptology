import { ServiceConfiguration } from 'meteor/service-configuration'
import { _ } from 'meteor/underscore'

const Biocryptology = {}
export default Biocryptology

// Request OpenID Connect credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Biocryptology.requestCredential = async function (options, credentialRequestCompleteCallback) {

  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options
    options = {}
  }

  // get the service configuration
  var config = ServiceConfiguration.configurations.findOne({service: 'biocryptology'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
        new ServiceConfiguration.ConfigError('biocryptology')
    )
    return undefined
  }
  console.log('service config', config)

  // prepare options
  const credentialToken = Random.secret()
  const loginStyle = OAuth._loginStyle('biocryptology', config, options)
  const scope = config.requestPermissions || ['openid']
  options = options || {}
  options.client_id = config.clientId;
  options.response_type = options.response_type || 'token'
  options.nonce = options.nonce || 'asas'   //@TODO is this some type of random?
  options.redirect_uri = OAuth._redirectUri('biocryptology', config)
  options.state = OAuth._stateParam(loginStyle, credentialToken,
    options.redirectUrl)
  options.scope = scope.join(' ')

  // prepare login url
  let loginUrl = config.authorization_endpoint+'?'+
    _.chain(options).keys().map(key => {
      return encodeURIComponent(key)+'='+encodeURIComponent(options[key])
    }).value().join('&')
  const claims = {userinfo:{}}
  if (_.isArray(config.claims)) {
    for (let claim of config.claims) {
      claims.userinfo[claim] = null
    }
  }
  else {
    claims = {userinfo: {'email_verified': null}}
  }
  console.log('claims', claims)
  const claimsJson = EJSON.stringify(claims)
  loginUrl += '&claims='+encodeURIComponent(claimsJson)
  // loginUrl += '&claims='+claimsJson
  console.log('loginURL: ' + loginUrl)

  // prepare popup options
  options.popupOptions = options.popupOptions || {};
  const popupOptions = {
    width:  options.popupOptions.width || 320,
    height: options.popupOptions.height || 450
  }

  // launch login
  const launchOptions = {
    loginService: 'biocryptology',
    loginStyle,
    loginUrl,
    credentialRequestCompleteCallback,
    credentialToken,
    popupOptions,
  }
  console.log('launchOptions', launchOptions)
  OAuth.launchLogin(launchOptions)
}
