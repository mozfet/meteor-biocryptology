import { _ } from 'meteor/underscore'

const Biocryptology = {}
export default Biocryptology

/**
 * Request the config from the server.
 * RPC to Meteor server is needed due to CORS of url endpoint denied by browser.
 * @returns {Promise}
 **/
Biocryptology.requestConfig = async function () {
  return new Promise(function(resolve, reject) {
    Meteor.call('biocryptology.requestConfiguration', (error, result) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

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
  var config = ServiceConfiguration.configurations.findOne({service: 'Biocryptology'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
        new ServiceConfiguration.ConfigError(
        'Biocryptology service is not configured.')
    )
    return
  }

  // retrieve the configuration from the server
  const serviceConfig = await Biocryptology.requestConfig()
  console.log('service config', serviceConfig)

  // options
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
  if (config.loginStyle && config.loginStyle == 'popup') {
    options.loginStyle = options.display = 'popup'
  }
  options.claims = config.claims || 'email_verified'
  console.log('options', options)

  // prepare login url
  const loginUrl = serviceConfig.authorization_endpoint+'?'+
    _.chain(options).keys().map(key => {
      return encodeURIComponent(key)+'='+encodeURIComponent(options[key])
    }).value().join('&')
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
