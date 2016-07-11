var test = require('tape')
var CreateClientStateUpdater = require('../')

test('Add key', function (t) {
  t.plan(2)
  var CSU = CreateClientStateUpdater()

  // You normally won't use this value. We're just checking it
  // in order to test our function
  var defaultInitialState = CSU.add('abc12345')
  var explicitInitialState = CSU.add('hello', {world: true})

  t.deepEqual(defaultInitialState, {}, 'Added new client')
  t.deepEqual(explicitInitialState, { world: true }, 'Added new client')
})

test('Delete key', function (t) {
  t.plan(1)
  var CSU = CreateClientStateUpdater()

  CSU.add('54321cba')
  // You normally won't use this value. We're just checking it
  // in order to test
  var deletedKeyVal = CSU.del('54321cba')
  t.deepEqual(deletedKeyVal, undefined, 'Deleted client')
})

test('Update key', function (t) {
  t.plan(1)
  var CSU = CreateClientStateUpdater()
  CSU.add('key', { value: true })

  var noChangePatches = CSU.update('key', { value: true })

  console.log(noChangePatches)

  t.deepEqual(noChangePatches, [], 'No patches')
  CSU.add()
})
