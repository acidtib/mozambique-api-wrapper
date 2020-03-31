const MozambiqueAPI = require('../index');

let mozambiqueClient = new MozambiqueAPI("<API_KEY>");


mozambiqueClient.search({
  "platform": "X1", 
  "player": "acidtib"
})
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  });

mozambiqueClient.search({
  "platform": "X1", 
  "uid": "2535428181264092,2533274987093902" 
})
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  });

mozambiqueClient.news()
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  });

mozambiqueClient.server()
  .then(function (result) {
    console.log(result);
  }).
  catch(function (e) {
    console.log(e);
  })

mozambiqueClient.history({
  "platform": "X1", 
  "player": "acidtib",
  "action": "get"
})
  .then(function (result) {
    console.log(result)
  }).
  catch(function (e) {
    console.log(e);
  });