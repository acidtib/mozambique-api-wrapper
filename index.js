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
 * @param {String} apiKey Your mozambiquehe.re Auth Key
 * @param {Any} [options] Options for the cache system
 * @param {Boolean} [options.useCache=true] Whether or not to use the cache system
 * @param {Number} [options.cacheLifetime=7200000] Cache lifetime
 */

function MozambiqueAPI(apiKey, options = { useCache: true, cacheLifetime: 7200000}) {
  if (!apiKey) {
    throw new Error("mozampique-api-wrapper: API Key missing");
  }
  let self = this;

  self.apiKey = apiKey;

  self.headers = {
    "User-Agent": "mozambique-api-wrapper",
    "Content-Type": "application/json"
  };

  switch (typeof options.useCache) {
    case 'boolean': { break; }
    default:{
      console.log(`[WARNING] mozampique-api-wrapper: options.useCache expected to be a Boolean (provided: ${typeof options.useCache}). Using default`);
      options.useCache = true;
      break;
    }
  }

  switch (typeof options.cacheLifetime) {
    case 'number': { break; }
    default: {
      console.log(`[WARNING] mozampique-api-wrapper: options.cacheLifetime expected to be a Number (provided: ${typeof options.cacheLifetime}). Using default`);
      options.cacheLifetime = 7200000;
      break;
    }
  }

  self.useCache = options.useCache;
  self.cacheLifetime = options.cacheLifetime
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


async function requestCache(self, url, type) {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  if(self.useCache) {
    fs.exists('./Cache/mozambiqueCache.json', function(existFile) {
      if(!existFile) {
        fs.exists('Cache', async function(existDir) {
          if(!existDir) {
            fs.mkdir('Cache', function(err) {})
          }
          fs.writeFile('./Cache/mozambiqueCache.json', '{}', { encoding: 'utf8' }, function(err) {})
        })
      }
    })

    await sleep(500)
    fs.readFile('./Cache/mozambiqueCache.json', async function (err, data) {
      if (err) return Promise.reject(err);

      data = JSON.parse(data);
      if (typeof data[`${type}Generated`] !== 'number' || Date.now() >= (data[`${type}Generated`] + self.cacheLifetime)) {
        data[type] = await request(self, url);
        data[`${type}Generated`] = Date.now();
        let json = JSON.stringify(data, null, 2);
        fs.writeFile('./Cache/mozambiqueCache.json', json, { encoding: 'utf8' }, function (err){});
      }
    });

    await sleep(1100)
    const json = require('./Cache/mozambiqueCache.json');
    var name = require.resolve('./Cache/mozambiqueCache.json');
    delete require.cache[name];
    return json[type];

  } else {
    return request(self, url);
  }
}

/**
 * Search a player using player name or UID
 * 
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
 * 
 * @param {String} [lang="en-us"] News language
 * @returns {JSON} Json with an array of Apex Legends news
 */

MozambiqueAPI.prototype.news = function (lang = "en-us") {
  let url = DIRECTORY.NEWS_URL + "&lang=" + lang + "&auth=" + this.apiKey;
  return request(this, url);
};


/**
 * Get server status for Origin, EA, Apex Legends and Mozambiquehe.re API
 * 
 * @returns {JSON} Json with status of all servers
 */

MozambiqueAPI.prototype.server = function() {
  let url = DIRECTORY.SERVER_STATUS
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
 * @returns {JSON} Json differs depending on action parameter. Please refer to API documentation for more info (https://mozambiquehe.re/api)
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
  return request(this, url) ; 
}

/**
 * Get all game data avaliable on [mozambiquehe.re](https://mozambiquehe.re/) separated by data type
 * 
 * Avaliable data types:
 * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
 * @param {String} dataType Type of data requested
 * @returns {JSON} Json with requested game data
 */

MozambiqueAPI.prototype.gamedata = async function(dataType) {
  let url = DIRECTORY.GAME_DATA + "type=" + dataType + "&auth=" + this.apiKey
  return await requestCache(this, url, dataType);
}

/**
 * Get the map rotation
 * 
 * @returns {JSON} Json with map rotation data
 */

MozambiqueAPI.prototype.mapRotation = function() {
  let url = DIRECTORY.MAP_ROTATION + "auth=" + this.apiKey
  return request(this, url);
}

module.exports = MozambiqueAPI;
