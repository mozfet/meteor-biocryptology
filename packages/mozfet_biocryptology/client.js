import { ServiceConfiguration } from 'meteor/service-configuration'
import { _ } from 'meteor/underscore'

const Biocryptology = {}
export default Biocryptology

// Request OpenID Connect credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Biocryptology.requestCredential =
    async function (options, credentialRequestCompleteCallback) {

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
  // console.log('service config', config)

  // prepare options
  const credentialToken = Random.secret()
  const loginStyle = OAuth._loginStyle('biocryptology', config, options)
  const scope = config.scopes || ['openid']
  options = options || {}
  options.client_id = config.clientId;
  options.response_type = options.response_type || 'code'
  options.nonce = credentialToken
  if (config.callbackUrl) {
    options.redirect_uri = config.callbackUrl
  }
  else {
    options.redirect_uri = OAuth._redirectUri('biocryptology', config)
  }
  // console.log('redirect uri:', options.redirect_uri)
  options.state = OAuth._stateParam(loginStyle, credentialToken,
    options.redirect_uri)
  // console.log('redirect state:', options.state)
  options.scope = scope.join(' ')

  // prepare login url
  let loginUrl = config.authorization_endpoint+'?'+
    _.chain(options).keys().map(key => {
      return encodeURIComponent(key)+'='+encodeURIComponent(options[key])
    }).value().join('&')
  const claims = {userinfo: {}, id_token: {auth_time: {essential: true}}}
  if (_.isArray(config.claims)) {
    for (let claim of config.claims) {
      claims.userinfo[claim] = {essential: true}
    }
  }
  else {
    claims.userinfo.email_verified = {essential: true}
  }
  // console.log('claims', claims)
  const claimsJson = EJSON.stringify(claims)
  loginUrl += '&claims='+encodeURIComponent(claimsJson)
  // loginUrl += '&claims='+claimsJson
  console.log('loginURL: ' + loginUrl)

  // prepare popup options
  options.popupOptions = options.popupOptions || {};
  const popupOptions = {
    width:  options.popupOptions.width || 800,
    height: options.popupOptions.height || 800
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
  // console.log('launchOptions', launchOptions)
  OAuth.launchLogin(launchOptions)
}
