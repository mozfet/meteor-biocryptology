import './server_test_stubs.js'
import { assert } from 'chai'
import Biocryptology from 'meteor/mozfet:biocryptology'

describe('Biocryptology', function () {
  this.timeout(10000)

  it('retrieves configuration', async function () {
    const result = await Biocryptology.requestConfiguration()
    // console.log(result)
    assert.isObject(result)
    assert.equal(result.authorization_endpoint,
      'https://is.sb.biocryptology.net/V1/auth')
  })
})
