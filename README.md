# Mozambique Here API Wrapper

A simple wrapper to use the [Mozambique Here API](https://github.com/HugoDerave/ApexLegendsAPI/blob/master/README.md). Please refer to the [API docs](https://apexlegendsapi.com/) to undestand the inputs and expected results.

Please refer to [DOCS.md](https://github.com/arubinofaux/mozambique-api-wrapper/blob/master/DOCS.md) to see a simple documentation for the NPM package

## How to get an auth key

Request it at the start of the [documentation](https://apexlegendsapi.com/)

## Installation

Install the package

```sh
$ cd /path/to/app
$ npm install --save mozambique-api-wrapper
```

## Usage

```js
// Require Wrapper Library
const MozambiqueAPI = require("mozambique-api-wrapper");

// Create Client instance by passing in API key and an optional parameter to choose which API version to use (default will always be the latest version, currently 5)
let mozambiqueClient = new MozambiqueAPI("<API_KEY>", 5);

// Search Player by name
mozambiqueClient
  .search({
    platform: "X1",
    player: "acidtib",
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Search Player by UID
mozambiqueClient
  .search({
    platform: "X1",
    uid: "2535428181264092",
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get News
mozambiqueClient
  .news()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get server status
mozambiqueClient
  .server()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get the Match History
mozambiqueClient
  .history("get", {
    platform: "X1",
    player: "acidtib",
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get the map rotation
mozambiqueClient
  .mapRotation()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Search a Origin user
mozambiqueClient
  .origin(
    {
      platform: "X1",
      player: "acidtib",
    },
    false
  )
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get apexlegendsstatus.com announcements
mozambiqueClient
  .announcements()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });

// Get the UID using the player name
mozambiqueClient
  .nameToUID({
    platform: "X1",
    player: "acidtib",
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (e) {
    console.log(e);
  });
```
