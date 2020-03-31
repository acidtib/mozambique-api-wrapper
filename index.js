const fetch = require('node-fetch');

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=4",
  NEWS_URL: BASE_URL + "/news?version=4",
  SERVER_STATUS: "https://apexlegendsstatus.com/servers.json",
  MATCH_HISTORY: BASE_URL + "/bridge?"
};

/**
 * @param {String} apiKey 
 */
function MozambiqueAPI(apiKey) {
  if (!apiKey) {
    throw new Error("API Key missing");
  }
  let self = this;

  self.apiKey = apiKey;

  self.headers = {
    "User-Agent": "mozambique-api-wrapper",
    "Content-Type": "application/json"
  };
}

function request(self, url) {
  return fetch(url, {
    headers: self.headers
  })
    .then(function (res) {
      return res.json();
    }).catch(function (err) {
      return Promise.reject(err);
    });
}

MozambiqueAPI.prototype.search = function (query) {
  let type

  if (query.player) {
    type = "player=" + query.player;
  }

  if (query.uid) {
    type = "uid=" + query.uid;
  }

  let url = DIRECTORY.SEARCH_URL + "&platform=" + query.platform + "&" + type + "&auth=" + this.apiKey;
  return request(this, url);
};

MozambiqueAPI.prototype.news = function (lang = "en-us") {
  let url = DIRECTORY.NEWS_URL + "&lang=" + lang + "&auth=" + this.apiKey;
  return request(this, url);
};

MozambiqueAPI.prototype.server = function() {
  let url = DIRECTORY.SERVER_STATUS
  return request(this, url)
}

MozambiqueAPI.prototype.matchs = function(query) {
  let type

  if (query.player) {
    type = "player=" + query.player;
  }

  if (query.uid) {
    type = "uid=" + query.uid;
  }

  let url = DIRECTORY.MATCH_HISTORY + type + "&platform" + query.platform + "&auth=" + this.apiKey + "&history=1&action=" + query.action;
  return request(this, url)  
}

module.exports = MozambiqueAPI;
