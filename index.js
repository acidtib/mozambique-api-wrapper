const fetch = require('node-fetch');
const fs = require('fs')

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=4",
  NEWS_URL: BASE_URL + "/news?version=4",
  SERVER_STATUS: "https://apexlegendsstatus.com/servers.json",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?",
  MAP_ROTATION: BASE_URL + "/maprotation?"
};


/**
 * Core of mozambique-api-wrapper
 * 
 * @constructor
 * @param {String} apiKey Your apexlegendsapi Auth Key
 * @param {Any} [options] Options for the cache system
 * @param {Boolean} [options.useCache=true] Whether or not to use the cache system
 * @param {Number} [options.cacheLifetime=1440] Cache lifetime in minutes
 */
class MozambiqueAPI {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("mozampique-api-wrapper: API Key missing");
    }
    let self = this;
    self.apiKey = apiKey;
    self.headers = {
      "User-Agent": "mozambique-api-wrapper",
      "Content-Type": "application/json"
    };
  }

  /**
   * Search a player using player name or UID
   *
   * @param {Any} query Query parameters
   * @param {String} [query.player] Player name
   * @param {String|Number} [query.uid] Player UID
   * @param {String} [query.platform] Player platform (PC, PS4, X1)
   * @returns {Player} Json with player info
   */
  search(query) {
    let type;

    if (query.player) {
      type = "player=" + query.player;
    }

    if (query.uid) {
      type = "uid=" + query.uid;
    }

    let url = DIRECTORY.SEARCH_URL + "&platform=" + query.platform + "&" + type + "&auth=" + this.apiKey;
    return request(this, url);
  }

  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] News language
   * @returns {News} Json with an array of Apex Legends news
   */
  news(lang = "en-us") {
    let url = DIRECTORY.NEWS_URL + "&lang=" + lang + "&auth=" + this.apiKey;
    return request(this, url);
  }

  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {ServerStatus} Json with status of all servers
   */
  server() {
    let url = DIRECTORY.SERVER_STATUS;
    return request(this, url);
  }

  /**
   * Avaliable for everyone but with limitations depending on your access type
   *
   * @param {Any} query Query parameters
   * @param {String} [query.player] Player name
   * @param {String|Number} [query.uid] Player UID
   * @param {String} [query.platform] Player platform (PC, PS4, X1)
   * @param {String} [query.action] Action for the Match History API (info, get, delete, add)
   * @returns {Object} Json differs depending on action parameter. Please refer to API documentation for more info (https://apexlegendsapi/api)
   */
  history(query) {
    let type;

    if (query.player) {
      type = "player=" + query.player;
    }

    if (query.uid) {
      type = "uid=" + query.uid;
    }

    let url = DIRECTORY.MATCH_HISTORY + type + "&platform" + query.platform + "&auth=" + this.apiKey + "&history=1&action=" + query.action;
    return request(this, url);
  }

  /**
   * WARNING: endpoint data not updated anymore
   * 
   * Get all game data avaliable on [apexlegendsapi](https://apexlegendsapi/) separated by data type
   *
   * Avaliable data types:
   * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
   * @param {String} dataType Type of data requested
   * @returns {Object} Json with requested game data
   */
  gamedata(dataType) {
    let url = DIRECTORY.GAME_DATA + "type=" + dataType + "&auth=" + this.apiKey;
    return await requestCache(this, url, dataType);
  }
}

module.exports = MozambiqueAPI;