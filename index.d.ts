export = MozambiqueAPI;
/**
 * Core of mozambique-api-wrapper
 * @class
 */
declare class MozambiqueAPI {
  /**
   * @constructor
   * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
   * @param {Number} [version=5] API version to use
   */
  constructor(apiKey: string, version?: number);
  apiKey: string;
  version: number;
  headers: {
    "User-Agent": string;
    "Content-Type": string;
    Authorization: string;
  };
  /**
   * Search a player using player name or UID
   *
   * @param {PlayerQuery} query - Query parameters
   * @param {object} [options]
   * @param {Boolean} [options.merge=false]
   * @param {Boolean} [options.removeMerged=false]
   * @returns {Promise<Player>} Object with player info
   */
  search(query: PlayerQuery, options: { merge: Boolean, removeMerged: Boolean }): Promise<Player>;
  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] Language of the news
   * @returns {Promise<ApexNews[]>} Array of Apex Legends news
   */
  news(lang?: string): Promise<ApexNews[]>;
  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {Promise<Servers>} Object with status of all servers
   */
  server(): Promise<Servers>;
  /**
   * Avaliable for everyone but with limitations depending on your api access type
   *
   * @param {String} action - Action for the Match History API (info, get, delete, add)
   * @param {PlayerQuery} [query] - Query parameters
   * @param {Number} [limit] - Limit of events to get on action get
   * @returns {Promise<Object>} Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info
   */
  history(action: string, query?: PlayerQuery, limit?: number): Promise<Object>;
  /**
   * Get the map rotation
   * @returns {Promise<MapRotationData>}
   */
  mapRotation(): Promise<MapRotationData>;
  /**
   * Search a Origin user
   * @param {String} player - player name
   * @param {Boolean} [showAllHits=false] - If true, get all possible hits for the given player name and returns it in an array
   * @returns {Promise<OriginData|OriginData[]>}
   */
  origin(
    player: string,
    showAllHits?: boolean
  ): Promise<OriginData | OriginData[]>;
  /**
   * Compare two players (WIP)
   *
   * @param {PlayerQuery} query1 - Query parameters
   * @param {PlayerQuery} query2 - Player query parameters
   * @returns {Promise<ComparedData>}
   */
  compare(query1: PlayerQuery, query2: PlayerQuery): Promise<ComparedData>;
  /**
   * Get the latest announcement of [apexlegendsstatus](https://apexlegendsstatus.com)
   * @returns {Promise<Announcement>}
   */
  announcements(): Promise<Announcement>;
  /**
   * Get the UID using the player name
   * @param {PlayerQuery} query
   * @param {String} query.player - player name
   * @param {String} query.platform - player platform
   * @returns {Promise<NameToUIDData|OriginData>}
   */
  nameToUID(query: PlayerQuery): Promise<NameToUIDData | OriginData>;
  /**
   * Avaliable data types:
   * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
   * @deprecated data not updated
   * @param {String} dataType Type of data requested
   * @returns {Object} Object with requested game data
   */
  gamedata(dataType: string): Object;
}
declare namespace MozambiqueAPI {
  export {
    PlayerQuery,
    Player,
    Legend,
    Tracker,
    Badge,
    LegendBadge,
    ApexNews,
    Servers,
    Regions,
    RegionData,
    ComparedData,
    MapRotationData,
    OriginData,
    Announcement,
    NameToUIDData,
  };
}
/**
 * Player query
 */
type PlayerQuery = {
  /**
   * - Player in-game name, obligatory if uid is not specified
   */
  player?: string;
  /**
   * - Player UID, obligatory if player name is not specified
   */
  uid?: string | number;
  /**
   * - Player platform
   */
  platform: string;
};
/**
 * Player data object
 */
type Player = {
  global: {
    name: string;
    uid: number;
    avatar: string;
    platform: string;
    level: number;
    toNextLevelPercent: number;
    internalUpdateCount: number;
    bans: {
      isActive: boolean;
      remainingSeconds: number;
      last_banReason: string;
    };
    rank: {
      rankScore: number;
      rankName: string;
      rankDiv: number;
      ladderPos: number;
      rankImg: string;
      rankedSeason: string;
    };
    battlepass: {
      level: string;
      history: {
        season1: number;
        season2: number;
        season3: number;
        season4: number;
        season5: number;
        season6: number;
        season7: number;
        season8: number;
      };
    };
    badges: Badge[] | null;
  };
  /**
   * - realtime data
   */
  realtime: {
    lobbyState: string;
    isOnline: number;
    isInGame: number;
    canJoin: number;
    partyFull: number;
    selectedLegend: string;
    currentState: string;
    currentStateSinceTimestamp: number;
    currentStateAsText: string;
  };
  legends: {
    selected: Legend;
    all: {
      Bangalore: Legend;
      Bloodhound: Legend;
      Lifeline: Legend;
      Caustic: Legend;
      Gibraltar: Legend;
      Mirage: Legend;
      Pathfinder: Legend;
      Wraith: Legend;
      Octane: Legend;
      Wattson: Legend;
      Crypto: Legend;
      Revenant: Legend;
      Loba: Legend;
      Rampart: Legend;
      Horizon: Legend;
      Fuse: Legend;
      Valkyrie: Legend;
      Seer: Legend;
    };
  };
  /**
   * - Internal API data
   */
  mozambiquehere_internal: {
    APIAccessType: string;
    ClusterID: string;
    rate_limit: {
      max_per_second: number;
      current_req: string;
    };
    clusterSrv: string;
  };
  /**
   * - Total stats from all legends together
   */
  total: {
    kd: {
      value: number;
      name: string;
    };
  };
};
/**
 * Apex Legends News Object
 */
type ApexNews = {
  title: string;
  link: string;
  img: string;
  short_desc: string;
};
/**
 * Servers status data object
 */
type Servers = {
  Origin_login: Regions;
  EA_novafusion: Regions;
  EA_accounts: Regions;
  ApexOauth_Crossplay: Regions;
  selfCoreTest: {
    Status: RegionData;
    Stats: RegionData;
    "Overflow-#1": RegionData;
    "Overflow-#2": RegionData;
    "Origin-API": RegionData;
    "Playstation-API": RegionData;
    "Xbox-API": RegionData;
  };
  otherPlatforms: {
    "Playstation-Network": {
      Status: String;
      QueryTimestamp: Number;
    };
    "Xbox-Live": {
      Status: String;
      QueryTimestamp: Number;
    };
  };
};
/**
 * Map data
 */
type MapData = {
  current: {
    start: number;
    end: number;
    readableDate_start: string;
    readableDate_end: string;
    map: string;
    DurationInSecs: number;
    DurationInMinutes: number;
    remainingSecs: number;
    remainingMins: number;
    remainingTimer: string;
  };
  next: {
    start: number;
    end: number;
    readableDate_start: string;
    readableDate_end: string;
    map: string;
    DurationInSecs: number;
    DurationInMinutes: number;
  };
};
/**
 * Map rotation data
 */
type MapRotationData = {
  battle_royale: MapData;
  arenas: MapData;
  /**
   * - May be incomplete
   */
  ranked: MapData;
};
/**
 * Origin data
 */
type OriginData = {
  name: string;
  uid: string;
  pid: string;
  avatar: string;
};
/**
 * Announcement of [apexlegendsstatus](https://apexlegendsstatus.com)
 */
type Announcement = {
  Release: number;
  Content: string;
  Duration: number;
};
/**
 * Legend data object
 */
type Legend = {
  LegendName: string;
  data?: Tracker[];
  gameInfo?: {
    skin: string;
    skinRarity: string;
    frame: string;
    frameRarity: string;
    pose: string;
    poseRarity: string;
    intro: string;
    introRarity: string;
    badges: LegendBadge[];
  };
  ImgAssets: {
    icon: string;
    banner: string;
  };
};
/**
 * Tracker data object
 */
type Tracker = {
  name: string;
  value: string | number;
  key: string;
  rank?: {
    rankPos: number;
    topPercent: number;
  };
  rankPlatformSpecific?: {
    rankPos: number;
    topPercent: number;
  };
};
/**
 * Badge data object
 */
type Badge = {
  name: string;
  value: string | number;
};
/**
 * Legend Badge data object
 */
type LegendBadge = {
  name: string;
  value: string | number;
  category: string;
};
/**
 * Regions object
 */
type Regions = {
  "EU-West": RegionData;
  "EU-East": RegionData;
  "US-West": RegionData;
  "US-Central": RegionData;
  "US-East": RegionData;
  SouthAmerica: RegionData;
  Asia: RegionData;
};
/**
 * Region data object
 */
type RegionData = {
  Status: string;
  HTTPCode: number;
  ResponseTime: number;
  QueryTimestamp: number;
};
/**
 * UID object
 */
type NameToUIDData = {
  result: number;
};
