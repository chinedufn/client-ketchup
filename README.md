client-ketchup [![npm version](https://badge.fury.io/js/client-ketchup.svg)](http://badge.fury.io/js/client-ketchup) [![Build Status](https://travis-ci.org/chinedufn/client-ketchup.svg?branch=master)](https://travis-ci.org/chinedufn/client-ketchup)
===============

> A simple interface for keeping remote clients up to date with their authoritative state

## Initial Motivation

The goal of `client-ketchup` is to be a small API for managing the states of a constantly changing set of connected clients.

A server might have an enormous application state object but each client only needs to know about different pieces of this data.

When a specific client's state changes, we **generate a small set of string-ified patches** to send to them so that they can
update (or catch-up) their local state.

This helps avoid sending a massive amount of data over whenever we have new state information to each connected client.

The intended use case was for running multiplayer game servers, but an example potential different case might be a websocket powered real-time
database.

## To Install

```
$ npm install --save client-ketchup
```

## Usage

```js
/*
 * On our server
 */

// Use this to generate new client state trackers
var CreateClientStateTracker = require('client-ketchup')
// Create a new client state tracker. You'll typically use one of these and add/remove different clients to it
var CST = CreateClientStateTracker()

// Add a new client
CST.add('some-client-id-1')

// Update our clients view of the world and then receive a set of JSON stringified patches that we can send over
var minimalPatches = CST.update({foo: 'bar', bazz: 'buzz'})

// Use whatever network protocol you please in order to send updates
myClients['some-client-id-1'].websocket.send(minimalPatches)

/*
 * Later on our client
 */
var patchObject = require('minimal-object-diff').patch
var minimalPatches = GetPatchesFromServerSomehow()
var myLocalState = GetLocalState()
myLocalState = patchObject(myLocalState, JSON.parse(minimalPatches))
```

`client-ketchup` only concerns itself with helping to keep track of and generate optimized diffs for your client data.
The method of transport 
([websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), [carrier pidgen](https://en.wikipedia.org/wiki/Homing_pigeon), etc)
is up to the consumer.

Typically you'll already have your network protocol in place and `client-ketchup` will be sprinkled in order to reduce bandwidth.

```sh
# view the demo in a local browser by pasting this into your terminal:
# changes to the `demo` directory will live reload in your browser
git clone https://github.com/chinedufn/client-ketchup && cd client-ketchup && npm install && npm run demo
```

## API

### `CST.{add, del, update}`

#### add

Add a client to our client pool

```js
CST.add('cuid-1')
CST.add('cuid-2', {thisIsOur: 'inital state object'})
```

#### del

Remove a client from our client pool

```js
CST.del('cuid-1')
```

#### update

Overwrite the clients state and receive JSON string-ified patches to send to a client

Applying these patches to the old state creates the new state

```js
CST.add('cuid3', {hello: 'world'})
var patches = CST.update('cuid2', {hello: 'mars'})

// Client `cuid3` now has a state of {hello: 'mars'}

// ... Later ... Likely on one of your clients

var patch = require('minimal-object-diff').patch

var patchedObject = patch({hello: 'world'}, JSON.parse(patches))

console.log(patchedObject)
// => {hello: 'mars'}
```

## TODO:

- [ ] I suppose that there should be a way to deal with clients that somehow got out of sync. Maybe accepting a state hash and verifying that it matches our authoritative client state.. And if not.. generate the appropriate patches? Let's handle that if/when it happens

## See Also

- [minimal-object-diff](https://github.com/chinedufn/minimal-object-diff)


## License

MIT
