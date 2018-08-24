import { HTTP } from 'meteor/http'
import { EJSON } from 'meteor/ejson'
// import { ServiceConfiguration } from 'meteor/ServiceConfiguration'

const Biocryptology = {}
export default Biocryptology

/**
 * Configure service on server startup
 **/
Meteor.startup(function () {
  if (!_.isObject(Meteor.settings.biocryptology)) {
    throw new Meteor.Error('CONFIG_ERROR',
      'Missing Meteor Settings for Biocryptology')
  }
  ServiceConfiguration.configurations.upsert(
    { service: 'biocryptology' },
    {
      $set: Meteor.settings.biocryptology
    }
  )
})

/**
 * Obtain Biocryptology’s OpenId configuration.
* @see http://is.sb.biocryptology.net/.well-known/openid-configuration
 * @returns {Promise} - Promise to return Biocryptology OpenId Configuration
 * @throws {Metoer.Error} - In the even of an error
 **/
Biocryptology.requestConfiguration = function() {
  return new Promise(function(resolve, reject) {
    HTTP.get(
      'http://is.sb.biocryptology.net/.well-known/openid-configuration',
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

/**
 * Define meteor method to circumvent browser cors restrictions
 **/
Meteor.methods({
  'biocryptology.requestConfiguration': async function () {
    return await Biocryptology.requestConfiguration
  }
})

Biocryptology.whitelistedFields = ['id', 'email']

Biocryptology.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
}

OAuth.registerService('biocryptology', 2, null, function (query) {
      console.log('here2')

      var debug = true;
      var token = getToken(query);
      if (debug) console.log('XXX: register token:', token);

      var accessToken = token.access_token || token.id_token;
      var expiresAt = (+new Date) + (1000 * parseInt(token.expires_in, 10));

      var userinfo = getUserInfo(accessToken);
      if (debug) console.log('XXX: userinfo:', userinfo);

      var serviceData = {};
      serviceData.id = userinfo.id;
      serviceData.username = userinfo.username;
      serviceData.accessToken = userinfo.accessToken;
      serviceData.expiresAt = userinfo.expiresAt;
      serviceData.email = userinfo.email;

      if (accessToken) {
        var tokenContent = getTokenContent(accessToken);
        var fields = _.pick(tokenContent, getConfiguration().idTokenWhitelistFields);
        _.extend(serviceData, fields);
      }

      if (token.refresh_token)
        serviceData.refreshToken = token.refresh_token;
      if (debug) console.log('XXX: serviceData:', serviceData);

      var profile = {};
      profile.name = userinfo.name;
      profile.email = userinfo.email;
      if (debug) console.log('XXX: profile:', profile);

      resolve({
        serviceData: serviceData,
        options: { profile: profile }
      })
      resolve()
    })

var userAgent = "Meteor";
if (Meteor.release) {
  userAgent += "/" + Meteor.release;
}

var getToken = function (query) {
  var debug = false;
  var config = getConfiguration();
  var serverTokenEndpoint = config.serverUrl + config.tokenEndpoint;
  var response;

  try {
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
          redirect_uri: OAuth._redirectUri('Biocryptology', config),
          grant_type: 'authorization_code',
          state: query.state
        }
      }
    );
  } catch (err) {
    throw _.extend(new Error("Failed to get token from Biocryptology " + serverTokenEndpoint + ": " + err.message),
      { response: err.response });
  }
  if (response.data.error) {
    // if the http response was a json object with an error attribute
    throw new Error("Failed to complete handshake with Biocryptology " + serverTokenEndpoint + ": " + response.data.error);
  } else {
    if (debug) console.log('XXX: getToken response: ', response.data);
    return response.data;
  }
};

var getUserInfo = function (accessToken) {
  var config = getConfiguration();

  if (config.userinfoEndpoint) {
    return getUserInfoFromEndpoint(accessToken, config);
  }
  else {
    return getUserInfoFromToken(accessToken);
  }
};

var getConfiguration = function () {
  var config = ServiceConfiguration.configurations.findOne({ service: 'Biocryptology' });
  if (!config) {
    throw new ServiceConfiguration.ConfigError('Service Biocryptology not configured.');
  }
  return config;
};

var getTokenContent = function (token) {
  var content = null;
  if (token) {
    try {
      var parts = token.split('.');
      var header = JSON.parse(new Buffer(parts[0], 'base64').toString());
      content = JSON.parse(new Buffer(parts[1], 'base64').toString());
      var signature = new Buffer(parts[2], 'base64');
      var signed = parts[0] + '.' + parts[1];
    } catch (err) {
      this.content = {
        exp: 0
      };
    }
  }
  return content;
}

var getUserInfoFromEndpoint = function (accessToken, config) {
  var debug = false;

  var serverUserinfoEndpoint = config.serverUrl + config.userinfoEndpoint;
  var response;
  try {
    response = HTTP.get(serverUserinfoEndpoint, {
      headers: {
        "User-Agent": userAgent,
        "Authorization": "Bearer " + accessToken
      }
    });
  }
  catch (err) {
    throw _.extend(new Error("Failed to fetch userinfo from Biocryptology " + serverUserinfoEndpoint + ": " + err.message), { response: err.response });
  }
  if (debug)
    console.log('XXX: getUserInfo response: ', response.data);

  var userinfo = response.data;
  return {
    id: userinfo.id || userinfo.sub,
    username: userinfo.username || userinfo.preferred_username,
    accessToken: OAuth.sealSecret(accessToken),
    expiresAt: expiresAt,
    email: userinfo.email,
    name: userinfo.name
  };
}

var getUserInfoFromToken = function (accessToken) {
  var tokenContent = getTokenContent(accessToken);
  var mainEmail = tokenContent.email || tokenContent.emails[0];

  return {
    id: tokenContent.sub,
    username: tokenContent.username || tokenContent.preferred_username || mainEmail,
    accessToken: OAuth.sealSecret(accessToken),
    expiresAt: tokenContent.exp,
    email: mainEmail,
    name: tokenContent.name
  }
}
