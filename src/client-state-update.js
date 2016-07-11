var extend = require('xtend')
var objectDiff = require('changeset')

module.exports = CreateClientStateUpdater

function CreateClientStateUpdater () {
  var clientStateMap = {}

  return {
    add: AddKey,
    del: DelKey,
    update: UpdateKey
  }

  function AddKey (key, initialState) {
    clientStateMap[key] = extend(initialState)
    return clientStateMap[key]
  }

  function DelKey (key) {
    delete clientStateMap[key]
    return clientStateMap[key]
  }

  // TODO: Optimize patch size
  // One potential algorithm:
  //   Look through patches
  //     -> for all put patches we extend a patches object for this set of patches
  //     -> for all del patches we create a dot prop string 'property.to.delete'
  //     -> Return a new object to extend the old object with, as well as an array of deletions
  function UpdateKey (key, newState) {
    var patches = objectDiff(clientStateMap[key], newState)
    console.log(`regular patch size: ${JSON.stringify(patches).length}`)
    console.log(`optimized patch size: ${1}`)
    console.log(`original object: ${JSON.stringify(newState).length}`)
    clientStateMap[key] = newState
    return patches
  }
}
