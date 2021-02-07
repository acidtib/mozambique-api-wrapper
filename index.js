const fetch = require('node-fetch');

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=",
  NEWS_URL: BASE_URL + "/news?",
  SERVER_STATUS: BASE_URL + "/servers?",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?"
};

//#region Private functions
/**
 * Make the request to the API servers
 * 
 * @private
 * @param {*} self
 * @param {String} url
 * @returns {JSON|Promise<Error>}
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
 * Sleep function
 * @private
 * @param {Number} ms - Time in milliseconds
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion


/**
 * Core of mozambique-api-wrapper
 * 
 * @constructor
 * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
 * @param {Number} [version=5] API version to use
 */
class MozambiqueAPI {
  constructor(apiKey, version = 5) {
    if (!apiKey) throw new Error("[ERROR] mozampique-api-wrapper: API Key missing");

    let self = this;
    self.apiKey = apiKey;
    self.version = version;
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
   * @returns {Player} Object with player info
   */
  search(query) {
    let type;
    if (query.player) type = "player=" + query.player;
    if (query.uid) type = "uid=" + query.uid;
    let url = DIRECTORY.SEARCH_URL + this.version + "&platform=" + query.platform + "&" + type;
    return request(this, url);
  }

  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] Language of the news
   * @returns {ApexNews[]} Array of Apex Legends news
   */
  news(lang = "en-us") {
    let url = DIRECTORY.NEWS_URL + "lang=" + lang;
    return request(this, url);
  }

  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {ServersObj} Object with status of all servers
   */
  server() {
    let url = DIRECTORY.SERVER_STATUS;
    return request(this, url);
  }

  /**
   * Avaliable for everyone but with limitations depending on your api access type
   *
   * @param {String} action - Action for the Match History API (info, get, delete, add)
   * @param {Object} [query] - Query parameters
   * @param {String} [query.player] - Player name
   * @param {String|Number} [query.uid] - Player UID
   * @param {String} [query.platform] - Player platform
   * @returns {Object} Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info 
   */
  history(action, query) {
    let q = ''; 
    if(action != "info") {
      let type;
      if (query.player) type = "player=" + query.player;
      if (query.uid) type = "uid=" + query.uid;
      q = type + "&platform=" + query.platform + "&";
    }

    let url = DIRECTORY.MATCH_HISTORY + q + "history=1&action=" + action;
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
   * @returns {ComparedData}
   */
  async compare(query1, query2) {
    if(!query1.platform || !query2.platform) throw new Error("Platform required");

    var DataObj = {
      players: [],
      data: {
        trackers: {},
        badges: {}
      },
      keys: {
        trackers: [],
        badges: []
      }
    };

    if(query1.platform === query2.platform) {
      let type;
      if (query1.player) type = `player=${query1.player},${query2.player}`;
      if (query1.uid) type = `uid=${query1.uid},${query2.uid}`;
      let url = DIRECTORY.SEARCH_URL + this.version + "&platform=" + query1.platform + "&" + type;
      DataObj.players = await request(this, url);

    } else {
      let type1;
      if (query1.player) type1 = "player=" + query1.player;
      if (query1.uid) type1 = "uid=" + query1.uid;
      let url1 = DIRECTORY.SEARCH_URL + this.version + "&platform=" + query1.platform + "&" + type1;
      DataObj.players[0] = await request(this, url1);

      let type2;
      if (query2.player) type2 = "player=" + query2.player;
      if (query2.uid) type2 = "uid=" + query2.uid;
      let url2 = DIRECTORY.SEARCH_URL + this.version + "&platform=" + query2.platform + "&" + type2;
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


//#region JSDoc typedefs
/**
 * Player data object
 * @typedef {Object} Player
 * @property {Object} global
 * @property {String} global.name - In-Game player name
 * @property {Number} global.uid
 * @property {String} global.avatar - Only available for PC players
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
 * @property {String} global.battlepass.level - Current season battle pass level
 * @property {Object} global.battlepass.history - Level history for all seasons
 * @property {Number} global.battlepass.history.season1
 * @property {Number} global.battlepass.history.season2
 * @property {Number} global.battlepass.history.season3
 * @property {Number} global.battlepass.history.season4
 * @property {Number} global.battlepass.history.season5
 * @property {Number} global.battlepass.history.season6
 * @property {Number} global.battlepass.history.season7
 * @property {Number} global.battlepass.history.season8
 * 
 * @property {Object} realtime - realtime data
 * @property {String} realtime.lobbyState
 * @property {Number} realtime.isOnline
 * @property {Number} realtime.isInGame
 * @property {Number} realtime.canJoin
 * @property {Number} realtime.partyFull
 * @property {String} realtime.selectedLegend
 * 
 * @property {Object} legends
 * @property {Legend} legends.selected
 * @property {Object} legends.all
 * @property {Legend} legends.all.Bangalore
 * @property {Legend} legends.all.Bloodhound
 * @property {Legend} legends.all.Lifeline
 * @property {Legend} legends.all.Caustic
 * @property {Legend} legends.all.Gibraltar
 * @property {Legend} legends.all.Mirage
 * @property {Legend} legends.all.Pathfinder
 * @property {Legend} legends.all.Wraith
 * @property {Legend} legends.all.Octane
 * @property {Legend} legends.all.Wattson
 * @property {Legend} legends.all.Crypto
 * @property {Legend} legends.all.Revenant
 * @property {Legend} legends.all.Loba
 * @property {Legend} legends.all.Rampart
 * @property {Legend} legends.all.Horizon
 * @property {Legend} legends.all.Fuse
 * 
 * @property {Object} mozambiquehere_internal - Internal API data
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

/**
 * Legend data object
 * @typedef {Object} Legend
 * @property {String} LegendName
 * @property {TrackerObj[]} data
 * @property {Object} gameInfo
 * @property {String} gameInfo.skin
 * @property {String} gameInfo.frame
 * @property {String} gameInfo.pose
 * @property {String} gameInfo.intro
 * @property {BadgeObj[]} gameInfo.badges
 * @property {Object} ImgAssets
 * @property {String} ImgAssets.icon
 * @property {String} ImgAssets.banner
 */

/**
 * Tracker data object
 * @typedef {Object} TrackerObj
 * @property {String} name
 * @property {String|Number} value
 * @property {String} key
 */

/**
 * Badge data object
 * @typedef {Object} BadgeObj
 * @property {String} name
 * @property {String|Number} value
 */

 /**
  * Apex Legends News Object
  * @typedef {Object} ApexNews
  * @property {String} title
  * @property {String} link
  * @property {String} img
  * @property {String} short_desc
  */

/**
 * Servers status data object
 * @typedef {Object} ServersObj
 * @property {RegionsObj} Origin_login
 * @property {RegionsObj} EA_novafusion
 * @property {RegionsObj} EA_accounts
 * @property {RegionsObj} ApexOauth_PC
 * @property {RegionsObj} ApexOauth_PS4
 * @property {RegionsObj} ApexOauth_X1
 * @property {RegionsObj} ApexOauth_Steam
 * @property {RegionsObj} ApexOauth_Crossplay
 * @property {RegionsObj} Mozambiquehere_StatsAPI
 */

/**
 * Regions data object
 * @typedef {Object} RegionsObj
 * @property {RegionDataObj} EU-West
 * @property {RegionDataObj} EU-East
 * @property {RegionDataObj} US-West
 * @property {RegionDataObj} US-Central
 * @property {RegionDataObj} US-East
 * @property {RegionDataObj} SouthAmerica
 * @property {RegionDataObj} Asia
 */

/**
 * Region data object
 * @typedef {Object} RegionDataObj
 * @property {String} Status
 * @property {Number} HTTPCode
 * @property {Number} ResponseTime
 * @property {Number} QueryTimestamp
 */

/**
 * Compared players data object
 * @typedef {Object} ComparedData
 * @property {Player[]} players
 * @property {Object} data
 * @property {TrackerObj[]} data.trackers
 * @property {BadgeObj[]} data.badges
 */

//#endregion
