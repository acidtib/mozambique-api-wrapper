const fetch = require("node-fetch");

const BASE_URL = "https://api.mozambiquehe.re";

const DIRECTORY = {
  SEARCH_URL: BASE_URL + "/bridge?version=",
  NEWS_URL: BASE_URL + "/news?",
  SERVER_STATUS: BASE_URL + "/servers?",
  MATCH_HISTORY: BASE_URL + "/bridge?",
  GAME_DATA: BASE_URL + "/gamedata?",
  MAP_ROTATION: BASE_URL + "/maprotation?",
  ORIGIN: BASE_URL + "/origin?",
  ANNOUNCEMENTS: "https://apexlegendsstatus.com/anno.json",
  NAME_TO_UID: BASE_URL + "/nametouid?",
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
    headers: self.headers,
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
 * @class
 */
class MozambiqueAPI {
  /**
   * @constructor
   * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
   * @param {Number} [version=5] API version to use
   */
  constructor(apiKey, version = 5) {
    if (!apiKey)
      throw new Error("[ERROR] mozampique-api-wrapper: API Key missing");

    let self = this;
    self.apiKey = apiKey;
    self.version = version;
    self.headers = {
      "User-Agent": "mozambique-api-wrapper",
      "Content-Type": "application/json",
      Authorization: self.apiKey,
    };
  }

  /**
   * Search a player using player name or UID
   *
   * @param {PlayerQuery} query - Query parameters
   * @returns {Promise<Player>} Object with player info
   */
  search(query) {
    let type;
    if (query.player) type = "player=" + query.player;
    if (query.uid) type = "uid=" + query.uid;
    let url =
      DIRECTORY.SEARCH_URL +
      this.version +
      "&platform=" +
      query.platform +
      "&" +
      type;
    return request(this, url);
  }

  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] Language of the news
   * @returns {Promise<ApexNews[]>} Array of Apex Legends news
   */
  news(lang = "en-us") {
    let url = DIRECTORY.NEWS_URL + "lang=" + lang;
    return request(this, url);
  }

  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {Promise<Servers>} Object with status of all servers
   */
  server() {
    let url = DIRECTORY.SERVER_STATUS;
    return request(this, url);
  }

  /**
   * Avaliable for everyone but with limitations depending on your api access type
   *
   * @param {String} action - Action for the Match History API (info, get, delete, add)
   * @param {PlayerQuery} [query] - Query parameters
   * @param {Number} [limit] - Limit of events to get on action get
   * @returns {Promise<Object>} Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info
   */
  history(action, query, limit) {
    let q = "";
    if (action != "info") {
      let type;
      if (query.player) type = "player=" + query.player;
      if (query.uid) type = "uid=" + query.uid;
      q = type + "&platform=" + query.platform + "&";
    }

    let l = "";
    if (!isNaN(limit)) l = "&limit=" + limit;

    let url = DIRECTORY.MATCH_HISTORY + q + "history=1&action=" + action + l;
    return request(this, url);
  }

  /**
   * Get the map rotation
   * @returns {Promise<MapRotationData>}
   */
  mapRotation() {
    let url = DIRECTORY.MAP_ROTATION;
    return request(this, url);
  }

  /**
   * Search a Origin user
   * @param {String} player - player name
   * @param {Boolean} [showAllHits=false] - If true, get all possible hits for the given player name and returns it in an array
   * @returns {Promise<OriginData|OriginData[]>}
   */
  origin(player, showAllHits = false) {
    let url =
      DIRECTORY.ORIGIN +
      "player=" +
      player +
      (showAllHits ? "&showAllHits" : "");
    return request(this, url);
  }

  /**
   * Get the latest announcement of [apexlegendsstatus](https://apexlegendsstatus.com)
   * @returns {Promise<Announcement>}
   */
  announcements() {
    return request(this, DIRECTORY.ANNOUNCEMENTS);
  }

  /**
   * Get the UID using the player name
   * @param {PlayerQuery} query
   * @param {String} query.player - player name
   * @param {String} query.platform - player platform
   * @returns {Promise<NameToUIDData|OriginData>} JSON Object with uid or {@link OriginData}
   */
  nameToUID(query) {
    let url =
      DIRECTORY.NAME_TO_UID +
      "player=" +
      query.player +
      "&platform=" +
      query.platform;
    return request(this, url);
  }

  /**
   * Avaliable data types:
   * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
   * @deprecated data not updated
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
 * Player query
 * @typedef {Object} PlayerQuery
 * @property {String} [player] - Player in-game name, obligatory if uid is not specified
 * @property {String|Number} [uid] - Player UID, obligatory if player name is not specified
 * @property {String} platform - Player platform
 */

/**
 * NameToUID data
 * @typedef {Object} NameToUIDData
 * @property {Number} [result] - The uid of the provided player
 */

/**
 * Player data object
 * @typedef {Object} Player
 * @property {Object} global
 * @property {String} global.name - In-Game player name
 * @property {Number} global.uid - Unique identifier
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
 * @property {Badge[]|null} global.badges
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
 * @property {Legend} legends.selected - Current selected legend
 * @property {Object} legends.all - All legends
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
 * @property {Legend} legends.all.Valkyrie
 *
 * @property {Object} mozambiquehere_internal - Internal API data
 * @property {String} mozambiquehere_internal.APIAccessType
 * @property {String} mozambiquehere_internal.ClusterID
 * @property {Object} mozambiquehere_internal.rate_limit
 * @property {Number} mozambiquehere_internal.rate_limit.max_per_second
 * @property {String} mozambiquehere_internal.rate_limit.current_req
 * @property {String} mozambiquehere_internal.clusterSrv
 *
 * @property {Object} total - Total stats from all legends together
 * @property {Number} total.kd - Will always be -1 unless kills and games played trackers are found
 */

/**
 * Legend data object
 * @typedef {Object} Legend
 * @property {String} LegendName
 * @property {Tracker[]} [data]
 * @property {Object} [gameInfo]
 * @property {String} gameInfo.skin
 * @property {String} gameInfo.frame
 * @property {String} gameInfo.pose
 * @property {String} gameInfo.intro
 * @property {LegendBadge[]} gameInfo.badges
 * @property {Object} ImgAssets
 * @property {String} ImgAssets.icon
 * @property {String} ImgAssets.banner
 */

/**
 * Tracker data object
 * @typedef {Object} Tracker
 * @property {String} name
 * @property {String|Number} value
 * @property {String} key
 */

/**
 * Badge data object
 * @typedef {Object} Badge
 * @property {String} name
 * @property {String|Number} value
 */

/**
 * Legend Badge data object
 * @typedef {Object} LegendBadge
 * @property {String} name
 * @property {String|Number} value
 * @property {String} category
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
 * @typedef {Object} Servers
 * @property {Regions} Origin_login
 * @property {Regions} EA_novafusion
 * @property {Regions} EA_accounts
 * @property {Regions} ApexOauth_Crossplay
 * @property {Object} selfCoreTest
 * @property {RegionData} selfCoreTest.Status-website
 * @property {RegionData} selfCoreTest.Stats-API
 * @property {RegionData} selfCoreTest.Overflow-#1
 * @property {RegionData} selfCoreTest.Overflow-#2
 * @property {RegionData} selfCoreTest.Origin-API
 * @property {RegionData} selfCoreTest.Playstation-API
 * @property {RegionData} selfCoreTest.Xbox-API
 * @property {Object} otherPlatforms
 * @property {Object} otherPlatforms.Playstation-Network
 * @property {String} otherPlatforms.Playstation-Network.Status
 * @property {Number} otherPlatforms.Playstation-Network.QueryTimestamp
 * @property {Object} otherPlatforms.Xbox-Live
 * @property {String} otherPlatforms.Xbox-Live.Status
 * @property {Number} otherPlatforms.Xbox-Live.QueryTimestamp
 */

/**
 * Regions object
 * @typedef {Object} Regions
 * @property {RegionData} EU-West
 * @property {RegionData} EU-East
 * @property {RegionData} US-West
 * @property {RegionData} US-Central
 * @property {RegionData} US-East
 * @property {RegionData} SouthAmerica
 * @property {RegionData} Asia
 */

/**
 * Region data object
 * @typedef {Object} RegionData
 * @property {String} Status
 * @property {Number} HTTPCode
 * @property {Number} ResponseTime
 * @property {Number} QueryTimestamp
 */

/**
 * Map data
 * @typedef {Object} MapData
 * @property {Object} current
 * @property {Number} current.start
 * @property {Number} current.end
 * @property {String} current.readableDate_start
 * @property {String} current.readableDate_end
 * @property {String} current.map
 * @property {Number} current.DurationInSecs
 * @property {Number} current.DurationInMinutes
 * @property {Number} current.remainingSecs
 * @property {Number} current.remainingMins
 * @property {String} current.remainingTimer
 *
 * @property {Object} next
 * @property {Number} next.start
 * @property {Number} next.end
 * @property {String} next.readableDate_start
 * @property {String} next.readableDate_end
 * @property {String} next.map
 * @property {Number} next.DurationInSecs
 * @property {Number} next.DurationInMinutes
 */

/**
 * Map rotation data
 * @typedef {Object} MapRotationData
 * @property {MapData} battle_royale
 * @property {MapData} arenas
 * @property {MapData} ranked - May be incomplete
 */

/**
 * Origin data
 * @typedef {Object} OriginData
 * @property {String} name
 * @property {String} uid
 * @property {String} pid
 * @property {String} avatar
 */

/**
 * Announcement of [apexlegendsstatus](https://apexlegendsstatus.com)
 * @typedef {Object} Announcement
 * @property {Number} Release
 * @property {String} Content
 * @property {Number} Duration
 */
//#endregion
