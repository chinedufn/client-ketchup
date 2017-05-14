module.exports = CreateClientStateUpdater

function CreateClientStateUpdater (opts) {
  var clientStateMap = {}

  return {
    add: AddKey,
    del: DelKey,
    update: UpdateKey
  }

  function AddKey (key, initialState) {
    clientStateMap[key] = initialState || {}
  }

  function DelKey (key) {
    delete clientStateMap[key]
  }

  /*
   * TODO: Will probably end up needing a way to re-sync out of date clients. Worry about it when it happens
   * i.e. accepting a hash of our clients state and verifying that it matches our authoritative value
  */

  function UpdateKey (key, newState) {
    var patches = opts.differ(clientStateMap[key], newState)
    clientStateMap[key] = newState

    return patches
  }
}
