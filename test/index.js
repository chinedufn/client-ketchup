var test = require('tape')
var objectDiffer = require('minimal-object-diff').diff
var CreateClientStateUpdater = require('../')

test('Update key', function (t) {
  t.plan(1)
  var CSU = CreateClientStateUpdater({
    differ: objectDiffer
  })
  CSU.add('key', { value: true, value2: true })

  var patches = CSU.update('key', { value: false })

  t.deepEqual(patches, {x: {value: false}, d: ['value2']})
})
