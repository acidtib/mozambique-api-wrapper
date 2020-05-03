/**
 * Wrapper to make accessing mozambiquehe.re APIs when writing code in Javascript (Node.js) much easier.
 * @module mozambique-api-wrapper
 */


const fetch = require('node-fetch');

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=4",
  NEWS_URL: BASE_URL + "/news?version=4",
  SERVER_STATUS: "https://apexlegendsstatus.com/servers.json",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?"
};


/**
 * Core of mozambique-api-wrapper
 * @constructor
 * @param {String} apiKey Your mozambiquehe.re Auth Key
 * @alias module:mozambique-api-wrapper
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


/**
 * Search a player using player name or UID
 * @param {Any} query Query parameters
 * @param {String} [query.player] Player name
 * @param {String|Number} [query.uid] Player UID
 * @param {String} [query.platform] Player platform (PC, PS4, X1)
 * @returns {JSON} Json with player info
 */

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


/**
 * Get recent news about Apex Legends
 * @param {String} [lang="en-us"] News language (default: en-us)
 * @returns {JSON} JSON with an array of Apex Legends news
 */

MozambiqueAPI.prototype.news = function (lang = "en-us") {
  let url = DIRECTORY.NEWS_URL + "&lang=" + lang + "&auth=" + this.apiKey;
  return request(this, url);
};


/**
 * Get server status for Origin, EA, Apex Legends and Mozambiquehe.re API
 * @returns {JSON} Json with status of all servers
 */

MozambiqueAPI.prototype.server = function() {
  let url = DIRECTORY.SERVER_STATUS
  return request(this, url)
}


/**
 * Avaliable for everyone but with limitations depending on your access type
 * @param {Any} query Query parameters
 * @param {String} [query.player] Player name
 * @param {String|Number} [query.uid] Player UID
 * @param {String} [query.platform] Player platform (PC, PS4, X1)
 * @param {String} [query.action] Action for the Match History API (info, get, delete, add)
 * @returns {JSON} Json differs depending on action parameter See API documentation for more info ()
 */

MozambiqueAPI.prototype.history = function(query) {
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

/**
 * Get all game data avaliable on https://mozambiquehe.re/
 * @param {String} dataType Type of data requested (assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns)
 * @returns {JSON} Json with requested game data
 */

MozambiqueAPI.prototype.gamedata = function(dataType) {
  let url = DIRECTORY.GAME_DATA + "type=" + dataType + "&auth=" + this.apiKey
  return request(this, url)
}

module.exports = MozambiqueAPI;
