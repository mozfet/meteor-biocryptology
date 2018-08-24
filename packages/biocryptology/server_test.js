import { assert } from 'chai';
import Biocryptology from 'meteor/mozfet:biocryptology'

describe('Biocryptology', function () {
  this.timeout(5000);

  it('retrieves configuration', async function () {
    const result = await Biocryptology.requestConfiguration()
    assert.isObject(result)
    console.log(result)
    assert.equal(result.authorization_endpoint, 'https://is.sb.biocryptology.net/V1/auth')
  })
})
