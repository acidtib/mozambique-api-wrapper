const fetch = require('node-fetch');

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=4",
  NEWS_URL: BASE_URL + "/news?",
  SERVER_STATUS: BASE_URL + "/servers?",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?"
};

//#region Typedefs
/**
 * Player object
 * @typedef {Object} PlayerObject
 * @property {Object} global
 * @property {String} global.name
 * @property {Number} global.uid
 * @property {String} global.avatar
 * @property {String} global.platform
 * @property {Number} global.level
 * @property {Number} global.toNextLevelPercent
 * @property {Number} global.internalUpdateCount
 * @property {Object} global.bans
 * @property {Boolean} global.bans.isActive
 * @property {Number} global.bans.remainingSeconds
 * @property {String} global.bans.last_banReason
 * @property {Object} global.rank
 * @property {Number} global.rank.rankScore
 * @property {String} global.rank.rankName
 * @property {Number} global.rank.rankDiv
 * @property {Number} global.rank.ladderPos
 * @property {String} global.rank.rankImg
 * @property {String} global.rank.rankedSeason
 * @property {Object} global.battlepass
 * @property {String} global.battlepass.level
 * @property {Object} global.battlepass.history
 * @property {Number} global.battlepass.history.season1
 * @property {Number} global.battlepass.history.season2
 * @property {Number} global.battlepass.history.season3
 * @property {Number} global.battlepass.history.season4
 * @property {Number} global.battlepass.history.season5
 * @property {Number} global.battlepass.history.season6
 * @property {Number} global.battlepass.history.season7
 * 
 * @property {Object} realtime
 * @property {String} realtime.lobbyState
 * @property {Number} realtime.isOnline
 * @property {Number} realtime.isInGame
 * @property {Number} realtime.canJoin
 * @property {Number} realtime.partyFull
 * @property {String} realtime.selectedLegend
 * 
 * @property {Object} legends
 * @property {Object} legends.selected
 * @property {String} legends.selected.LegendName
 * @property {Array} legends.selected.data
 * @property {String} legends.selected.data[].name
 * @property {String|Number} legends.selected.data[].value
 * @property {String} legends.selected.data[].key
 * @property {Object} legends.selected.ImgAssets
 * @property {String} legends.selected.ImgAssets.icon
 * @property {String} legends.selected.ImgAssets.banner
 * @property {Object} legends.all
 * 
 * @property {Object} mozambiquehere_internal
 * @property {Boolean} mozambiquehere_internal.isNewToDB
 * @property {String} mozambiquehere_internal.claimedBy
 * @property {String} mozambiquehere_internal.APIAccessType
 * @property {String} mozambiquehere_internal.ClusterID
 * @property {Object} mozambiquehere_internal.rate_limit
 * @property {Number} mozambiquehere_internal.rate_limit.max_per_second
 * @property {String} mozambiquehere_internal.rate_limit.current_req
 * 
 * @property {Object} total
 */
//#endregion

//#region Private functions
/**
 * Make the request to the API servers
 * 
 * @private
 * @param {*} self
 * @param {String} url
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
//#endregion


/**
 * Core of mozambique-api-wrapper
 * 
 * @constructor
 * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
 */
class MozambiqueAPI {
  constructor(apiKey) {
    if (!apiKey) throw new Error("[ERROR] mozampique-api-wrapper: API Key missing");

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
   * @param {Object} query - Query parameters
   * @param {String} [query.player] - Player name
   * @param {String|Number} [query.uid] - Player UID
   * @param {String} [query.platform] - Player platform
   * @returns {PlayerObject} Object with player info
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
   * @param {Object} query - Query parameters
   * @param {String} [query.player] - Player name
   * @param {String|Number} [query.uid] - Player UID
   * @param {String} [query.platform] - Player platform
   * @param {String} action - Action for the Match History API (info, get, delete, add)
   * @returns {Object} Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info 
   */
  history(query, action) {
    let type;
    if (query.player) type = "player=" + query.player;
    if (query.uid) type = "uid=" + query.uid;
    let url = DIRECTORY.MATCH_HISTORY + type + "&platform" + query.platform + "&history=1&action=" + action;
    return request(this, url);
  }

  
  /**
   * Compare two players
   *
   * @param {Object} query1 - Query parameters
   * @param {String} [query1.player] - Player name
   * @param {String|Number} [query1.uid] - Player UID
   * @param {String} [query1.platform] - Player platform
   * @param {Object} query2 - Query parameters
   * @param {String} [query2.player] - Player name
   * @param {String|Number} [query2.uid] - Player UID
   * @param {String} [query2.platform] - Player platform
   * @returns {PlayerObject}
   */
  async compare(query1, query2) {
    if(!query1.platform || !query2.platform) throw new Error("Platform required");
    
    var DataObj = {
      players: [],
      compared: {},
      keys: []
    };

    if(query1.platform == query2.platform) {
      let type;
      if (query1.player) type = `player=${query1.player},${query2.player}`;
      if (query1.uid) type = `uid=${query1.uid},${query2.uid}`;
      let url = DIRECTORY.SEARCH_URL + "&platform=" + query1.platform + "&" + type;
      DataObj.players = await request(this, url);
    } else {
      
      let type1;
      if (query1.player) type1 = "player=" + query1.player;
      if (query1.uid) type1 = "uid=" + query1.uid;
      let url1 = DIRECTORY.SEARCH_URL + "&platform=" + query1.platform + "&" + type1;
      DataObj.players[0] = await request(this, url1);

      let type2;
      if (query2.player) type2 = "player=" + query2.player;
      if (query2.uid) type2 = "uid=" + query2.uid;
      let url2 = DIRECTORY.SEARCH_URL + "&platform=" + query2.platform + "&" + type2;
      DataObj.players[1] = await request(this, url2);
    }

    return DataObj;
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