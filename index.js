const fetch = require('node-fetch');

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=4",
  NEWS_URL: BASE_URL + "/news?",
  SERVER_STATUS: BASE_URL + "/servers?",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?"
};

/**
 * @private
 */
function request(self, url) {
  return fetch(url, {
    headers: self.headers
  })
  .then(function (res) {
    return res.json();
  })
  .catch(function (err) {
    return Promise.reject(err);
  });
}

/**
 * Core of mozambique-api-wrapper
 * 
 * @constructor
 * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
 */
class MozambiqueAPI {
  constructor(apiKey) {
    if (!apiKey) throw new Error("mozampique-api-wrapper: API Key missing");

    let self = this;
    self.apiKey = apiKey;
    self.headers = {
      "User-Agent": "mozambique-api-wrapper",
      "Content-Type": "application/json",
      "Authorization": self.apiKey
    };
  }

  /**
   * Search a player using player name or UID
   *
   * @param {Object} query Query parameters
   * @param {String} [query.player] Player name
   * @param {String|Number} [query.uid] Player UID
   * @param {String} [query.platform] Player platform (PC, PS4, X1)
   * @returns {Object} Object with player info
   */
  search(query) {
    let type;
    if (query.player) type = "player=" + query.player;
    if (query.uid) type = "uid=" + query.uid;
    let url = DIRECTORY.SEARCH_URL + "&platform=" + query.platform + "&" + type;
    return request(this, url);
  }

  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] Language of the news
   * @returns {Array} Array of Apex Legends news
   */
  news(lang = "en-us") {
    let url = DIRECTORY.NEWS_URL + "lang=" + lang;
    return request(this, url);
  }

  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {Object} Object with status of all servers
   */
  server() {
    let url = DIRECTORY.SERVER_STATUS;
    return request(this, url);
  }

  /**
   * Avaliable for everyone but with limitations depending on your api access type
   *
   * @param {Object} query Query parameters
   * @param {String} [query.player] Player name
   * @param {String|Number} [query.uid] Player UID
   * @param {String} [query.platform] Player platform (PC, PS4, X1)
   * @param {String} [query.action] Action for the Match History API (info, get, delete, add)
   * @returns {Object} Object differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info 
   */
  history(query) {
    let type;
    if (query.player) type = "player=" + query.player;
    if (query.uid) type = "uid=" + query.uid;
    let url = DIRECTORY.MATCH_HISTORY + type + "&platform" + query.platform + "&history=1&action=" + query.action;
    return request(this, url);
  }

  
  /**
   * Compare two players
   *
   * @param {Object} query1 Query parameters
   * @param {String} [query1.player] Player name
   * @param {String|Number} [query1.uid] Player UID
   * @param {String} [query1.platform] Player platform (PC, PS4, X1)
   * @param {Object} query2 Query parameters
   * @param {String} [query2.player] Player name
   * @param {String|Number} [query2.uid] Player UID
   * @param {String} [query2.platform] Player platform (PC, PS4, X1)
   * @returns {Object}
   */
  compare(query1, query2) {

  }

  /**
   * WARNING: endpoint data not updated anymore
   * 
   * Avaliable data types:
   * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
   * @deprecated data not update anymore
   * @param {String} dataType Type of data requested
   * @returns {Object} Object with requested game data
   */
  gamedata(dataType) {
    let url = DIRECTORY.GAME_DATA + "type=" + dataType;
    return request(this, url);
  }
}

module.exports = MozambiqueAPI;