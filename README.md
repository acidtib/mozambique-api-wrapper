# Mozambique Here API Wrapper
A simple wrapper to use the [Mozambique Here API](https://github.com/HugoDerave/ApexLegendsAPI/blob/master/README.md). Please refer to the API docs to undestand the inputs and expected results.

### Installation

Install the package

```sh
$ cd /path/to/app
$ npm install --save mozambique-api-wrapper
```

### Usage

```js
// Require Wrapper Library
const MozambiqueAPI = require('mozambique-api-wrapper');

// Create Client instance by passing in API key
let mozambiqueClient = new MozambiqueAPI("<API_KEY>");

// Search Player
mozambiqueClient.search({
  "platform": "X1", 
  "player": "acidtib"
})
  .then(function(result){
    console.log(result);
  }).
  catch(function(e){
    console.log(e);
  });

// Search Player by UID
mozambiqueClient.search({
  "platform": "X1", 
  "uid": "2535428181264092"
})
  .then(function(result){
    console.log(result);
  }).
  catch(function(e){
    console.log(e);
  });

// Get News
mozambiqueClient.news()
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  });

// Get the server status
mozambiqueClient.server()
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  })
```
