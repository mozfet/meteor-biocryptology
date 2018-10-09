import { HTTP } from 'meteor/http'
import { EJSON } from 'meteor/ejson'
import { ServiceConfiguration } from 'meteor/service-configuration'

// console.log('Load Biocryptology Flow API')

const Biocryptology = {}
export default Biocryptology

/**
 * Configure service on server startup
 **/
Meteor.startup(async function () {
  if (_.isObject(Meteor.settings.biocryptology)) {

    // retrieve configuration from biocryptology server and meteor settings
    const configPromise = Biocryptology.requestConfiguration()
    configPromise.catch(error => {
      throw new Meteor.Error('BIOCRYPTOLOGY', error)
    })
    const openIdConfig = await configPromise
    config = Meteor.settings.biocryptology
    config.authorization_endpoint = openIdConfig.authorization_endpoint
    config.token_endpoint = openIdConfig.token_endpoint
    config.userinfo_endpoint = openIdConfig.userinfo_endpoint
    config.end_session_endpoint = openIdConfig.end_session_endpoint
    // console.log('Biocryptology service config', config)

    ServiceConfiguration.configurations.upsert(
      { service: 'biocryptology' }, {$set: config}
    )
  }
  else {
    throw new Meteor.Error('CONFIG_ERROR',
      'Missing Meteor Settings for Biocryptology')
  }
})

/**
 * Obtain Biocryptology’s OpenId configuration.
* @see http://is.sb.biocryptology.net/.well-known/openid-configuration
 * @returns {Promise} - Promise to return Biocryptology OpenId Configuration
 * @throws {Metoer.Error} - In the even of an error
 **/
Biocryptology.requestConfiguration = function() {
  return new Promise((resolve, reject) => {
    HTTP.get(
      Meteor.settings.biocryptology.wellknownConfig,
      (error, result) => {
        if (error) {
          console.error(error)
          reject('Unable to obtain Biocryptology configuration.')
        }
        else {
          if (result.statusCode === 200) {
            const obj = EJSON.parse(result.content)
            resolve(obj)
          }
          else {
            reject('Incorrect response code returned for Biocryptology configuration.')
          }
        }
      }
    )
  })
}

Biocryptology.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
}

OAuth.registerService('biocryptology', 2, null, function (query) {
      // console.log('Biocryptology Service Query', query)

      var token = getToken(query)
      console.log('biocryptology service token:', token)

      var tokenContent = getTokenContent(token.id_token)
      console.log('biocryptologuy id token content:', tokenContent)

      var userinfo = getUserInfo(token);
      console.log('biocryptology service userinfo:', userinfo);

      var serviceData = {
        id: userinfo.sub,
        // username: userinfo.username,
        accessToken: OAuth.sealSecret(token.access_token),
        expiresAt: userinfo.expiresAt,
        email: userinfo.email,
        refreshToken: token.refresh_token
      }
      console.log('serviceData:', serviceData)

      return {
        serviceData,
        options: {profile: {
          // name: userinfo.name,
          email: userinfo.email
        }}
      }
    })

var userAgent = "Meteor";
if (Meteor.release) {
  userAgent += "/" + Meteor.release;
}

var getToken = function (query) {
  // console.log('getToken query:', query)
  var debug = false
  var config = getConfiguration()
  // console.log('getToken config:', config)
  var serverTokenEndpoint = config.token_endpoint
  // console.log('getToken serverTokenEndpoint:', serverTokenEndpoint)
  var response

  try {
    const redirect_uri = OAuth._redirectUri('Biocryptology', config)
    // console.log('getToken redirect_uri', redirect_uri)
    response = HTTP.post(
      serverTokenEndpoint,
      {
        headers: {
          Accept: 'application/json',
          "User-Agent": userAgent
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.secret),
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code',
          state: query.state
        }
      }
    )
  } catch (err) {
    throw _.extend(new Error("Failed to get token from Biocryptology " +
        serverTokenEndpoint + ": " + err.message), { response: err.response })
  }
  if (response.data.error) {
    // if the http response was a json object with an error attribute
    throw new Error("Failed to complete handshake with Biocryptology " +
        serverTokenEndpoint + ": " + response.data.error)
  } else {
    // console.log('getToken response: ', response.data)
    return response.data;
  }
}

var getUserInfo = function (token) {
  const config = getConfiguration()

  if (config.userinfo_endpoint) {
    // console.log('getting user info from endpoint')
    try {
      const response = HTTP.get(config.userinfo_endpoint, {
        headers: {
          "User-Agent": userAgent,
          "Authorization": `${token.token_type} ${token.access_token}`
        }
      })
      console.log('getUserInfo response: ', response.data)
      return {
        sub: response.data.sub,
        expiresAt: (+new Date) + (1000 * parseInt(token.expires_in, 10)),
        email: response.data.email,
      }
    }
    catch (err) {
      throw _.extend(new Error("Failed to fetch userinfo from Biocryptology " +
          config.userinfo_endpoint + ": " +
          err.message), { response: err.response })
    }
  }
  else {
    throw new Error('Missing userinfo_endpoint from biocryptology oath config.')
  }
}

var getConfiguration = function () {
  var config = ServiceConfiguration.configurations.findOne({ service: 'biocryptology' })
  if (!config) {
    throw new ServiceConfiguration.ConfigError('biocryptology.')
  }
  return config
}

var getTokenContent = function (token) {
  var content = null
  if (token) {
    try {
      var parts = token.split('.');
      var header = JSON.parse(new Buffer(parts[0], 'base64').toString())
      content = JSON.parse(new Buffer(parts[1], 'base64').toString())
      var signature = new Buffer(parts[2], 'base64')
      var signed = parts[0] + '.' + parts[1]
    } catch (err) {
      this.content = {
        exp: 0
      }
    }
  }
  return content;
}
