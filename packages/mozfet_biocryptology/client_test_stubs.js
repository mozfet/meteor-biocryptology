import Sinon from 'sinon'
import { EJSON } from 'meteor/ejson'

const loginStyle = 'popup'
const clientId = '1808251124098993bdpkmEZm1izMS1'
const secret = 'KBrPGaqhWicmN'
const claims = ['email_verified', 'name', 'surname']
const callbackUrl = 'http://160.226.132.146:3200/_oauth/biocryptology'
const authorization_endpoint = 'https://is.sb.biocryptology.net/V1/auth'

// stub service configuration
Sinon.stub(ServiceConfiguration.configurations, 'findOne').callsFake(function () {
  return {
    loginStyle, clientId, secret, claims, callbackUrl, authorization_endpoint
  }
})

// stub service configuration
Sinon.stub(Meteor, 'call').callsFake(function (fn, cb) {
  cb(null,
    {
      'acr_values_supported':[],
      'authorization_endpoint':'https://is.sb.biocryptology.net/V1/auth',
      'check_session_iframe':'http://default.com',
      'claims_parameter_supported':false,
      'claims_supported':[
        'sub','email_verified','birthdate','address','gender','iss','phone_number_verified','given_name','locale','picture','updated_at','auth_time','name','phone_number','family_name','prefered_username','email'
      ],
      'claim_types_supported':[],
      'display_values_supported':[],
      'end_session_endpoint':'https://is.sb.biocryptology.net/V1/end',
      'grant_types_supported':['authorization_code','implicit'],
      'id_token_encryption_alg_values_supported':[''],
      'id_token_encryption_enc_values_supported':[''],
      'id_token_signing_alg_values_supported':['ES512','ES384','ES256','RS512','RS384','RS256','HS512','HS384','HS256'],
      'issuer':'https://is.sb.biocryptology.net/',
      'jwks_uri':'https://is.sb.biocryptology.net/V1/jwks',
      'registration_endpoint':'http://default.com',
      'request_object_encryption_alg_values_supported':['RSA-OAEP','RSA1_5'],
      'request_object_encryption_enc_values_supported':['A128GCM','A128CBC-HS512','A128CBC-HS384','A128CBC-HS256','A128CBC'],
      'request_object_signing_alg_values_supported':[''],
      'request_parameter_supported':true,
      'request_uri_parameter_supported':false,
      'require_request_uri_registration':false,
      'response_modes_supported':['fragment','query','form_post'],
      'response_types_supported':['code','id_token','id_token token','code id_token','code token','code id_token token'],
      'revocation_endpoint':'http://default.com',
      'scopes_supported':['email','openid','phone','address','profile'],
      'service_documentation':'http://default.com',
      'subject_types_supported':['public'],
      'token_endpoint':'https://is.sb.biocryptology.net/V1/token',
      'token_endpoint_auth_methods_supported':['client_secret_basic','client_secret_post'],
      'token_endpoint_auth_signing_alg_values_supported':[],
      'ui_locales_supported':[],
      'userinfo_encryption_alg_values_supported':[],
      'userinfo_encryption_enc_values_supported':[],
      'userinfo_endpoint':'https://is.sb.biocryptology.net/V1/userinfo',
      'userinfo_signing_alg_values_supported':[]
    }
  )
})
