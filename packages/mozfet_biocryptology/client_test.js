import { assert } from 'chai'
import Sinon from 'sinon'
import Biocryptology from 'meteor/mozfet:biocryptology'
import './client_test_stubs'

function fetchIp() {
  return new Promise(function(resolve, reject) {
    HTTP.get('https://api.ipify.org?format=json&callback=?', (error, result) => {
      if (error) {
        reject(error)
      }
      else {
        console.log('external ip result', result)
        const ip = EJSON.parse(result.content).ip
        resolve(ip)
      }
    })
  });
}

describe('Biocryptology', function () {
  this.timeout(5000);

  before(function (done) {
    fetchIp().then(ip => {
      console.log('before test ip', ip)
      Sinon.stub(Meteor, 'absoluteUrl').callsFake(function (path, options) {
        console.log('absoluteUrl', path, options)
        const url = 'http://'+ip+':3000/'+path
        console.log('callback url', url)
        return url;
      })
      done()
    })
  })

  it('request credential', async function (done) {
    const cb = (resultOrError) => {
      assert.typeOf(resultOrError, 'String')
      console.log('request credential cb resultOrError', resultOrError)
      done()
    }
    Biocryptology.requestCredential(null, cb)
  })  
})
