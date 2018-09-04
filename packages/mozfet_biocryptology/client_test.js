import './client_test_stubs'
import { assert } from 'chai'
import Biocryptology from 'meteor/mozfet:biocryptology'

describe('Biocryptology', function () {
  this.timeout(60000)

  it('request credential', async function (done) {
    const cb = (resultOrError) => {
      assert.typeOf(resultOrError, 'String')
      console.log('request credential cb resultOrError', resultOrError)
      done()
    }
    Biocryptology.requestCredential(null, cb)
  })
})
