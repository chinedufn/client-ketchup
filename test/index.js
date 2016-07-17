var test = require('tape')
var CreateClientStateUpdater = require('../')

test('Update key', function (t) {
  t.plan(1)
  var CSU = CreateClientStateUpdater()
  CSU.add('key', { value: true, value2: true })

  var patches = JSON.parse(CSU.update('key', { value: false }))

  t.deepEqual(patches, {x: {value: false}, d: ['value2']})
})
