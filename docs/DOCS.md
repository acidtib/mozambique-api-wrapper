## Classes

<dl>
<dt><a href="#MozambiqueAPI">MozambiqueAPI</a></dt>
<dd><p>Core of mozambique-api-wrapper</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PlayerQuery">PlayerQuery</a> : <code>Object</code></dt>
<dd><p>Player query</p>
</dd>
<dt><a href="#BulkPlayerQuery">BulkPlayerQuery</a> : <code>Object</code></dt>
<dd><p>Bulk player query</p>
</dd>
<dt><a href="#NameToUIDData">NameToUIDData</a> : <code>Object</code></dt>
<dd><p>NameToUID data</p>
</dd>
<dt><a href="#Player">Player</a> : <code>Object</code></dt>
<dd><p>Player data object</p>
</dd>
<dt><a href="#Legend">Legend</a> : <code>Object</code></dt>
<dd><p>Legend data object</p>
</dd>
<dt><a href="#Tracker">Tracker</a> : <code>Object</code></dt>
<dd><p>Tracker data object</p>
</dd>
<dt><a href="#Badge">Badge</a> : <code>Object</code></dt>
<dd><p>Badge data object</p>
</dd>
<dt><a href="#LegendBadge">LegendBadge</a> : <code>Object</code></dt>
<dd><p>Legend Badge data object</p>
</dd>
<dt><a href="#ApexNews">ApexNews</a> : <code>Object</code></dt>
<dd><p>Apex Legends News Object</p>
</dd>
<dt><a href="#Servers">Servers</a> : <code>Object</code></dt>
<dd><p>Servers status data object</p>
</dd>
<dt><a href="#Regions">Regions</a> : <code>Object</code></dt>
<dd><p>Regions object</p>
</dd>
<dt><a href="#RegionData">RegionData</a> : <code>Object</code></dt>
<dd><p>Region data object</p>
</dd>
<dt><a href="#MapData">MapData</a> : <code>Object</code></dt>
<dd><p>Map data</p>
</dd>
<dt><a href="#MapRotationData">MapRotationData</a> : <code>Object</code></dt>
<dd><p>Map rotation data</p>
</dd>
<dt><a href="#OriginData">OriginData</a> : <code>Object</code></dt>
<dd><p>Origin data</p>
</dd>
<dt><a href="#Announcement">Announcement</a> : <code>Object</code></dt>
<dd><p>Announcement of <a href="https://apexlegendsstatus.com">apexlegendsstatus</a></p>
</dd>
</dl>

<a name="MozambiqueAPI"></a>

## MozambiqueAPI

Core of mozambique-api-wrapper

**Kind**: global class

- [MozambiqueAPI](#MozambiqueAPI)
  - [new MozambiqueAPI(apiKey, [version], [userAgent])](#new_MozambiqueAPI_new)
  - [.search(query, [options])](#MozambiqueAPI+search) ⇒ [<code>Promise.&lt;Player&gt;</code>](#Player)
  - [.bulkSearch(bulkQuery, [options])](#MozambiqueAPI+bulkSearch) ⇒ <code>Promise.&lt;Array.&lt;Player&gt;&gt;</code>
  - [.news([lang])](#MozambiqueAPI+news) ⇒ <code>Promise.&lt;Array.&lt;ApexNews&gt;&gt;</code>
  - [.server()](#MozambiqueAPI+server) ⇒ [<code>Promise.&lt;Servers&gt;</code>](#Servers)
  - [.history(action, [query], [limit], [start], [end])](#MozambiqueAPI+history) ⇒ <code>Promise.&lt;Object&gt;</code>
  - [.mapRotation()](#MozambiqueAPI+mapRotation) ⇒ [<code>Promise.&lt;MapRotationData&gt;</code>](#MapRotationData)
  - [.origin(player, [showAllHits])](#MozambiqueAPI+origin) ⇒ <code>Promise.&lt;(OriginData\|Array.&lt;OriginData&gt;)&gt;</code>
  - [.announcements()](#MozambiqueAPI+announcements) ⇒ [<code>Promise.&lt;Announcement&gt;</code>](#Announcement)
  - [.nameToUID(query)](#MozambiqueAPI+nameToUID) ⇒ <code>Promise.&lt;(NameToUIDData\|OriginData)&gt;</code>
  - ~~[.gamedata(dataType)](#MozambiqueAPI+gamedata) ⇒ <code>Object</code>~~

<a name="new_MozambiqueAPI_new"></a>

### new MozambiqueAPI(apiKey, [version], [userAgent])

| Param       | Type                | Default                                         | Description                                                  |
| ----------- | ------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| apiKey      | <code>String</code> |                                                 | Your [Apex Legends API](https://apexlegendsapi.com) Auth Key |
| [version]   | <code>Number</code> | <code>5</code>                                  | API version to use                                           |
| [userAgent] | <code>String</code> | <code>&quot;mozambique-api-wrapper&quot;</code> | User-Agent header                                            |

<a name="MozambiqueAPI+search"></a>

### mozambiqueAPI.search(query, [options]) ⇒ [<code>Promise.&lt;Player&gt;</code>](#Player)

Search a player using player name or UID

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: [<code>Promise.&lt;Player&gt;</code>](#Player) - Object with player info

| Param                  | Type                                     | Default            | Description      |
| ---------------------- | ---------------------------------------- | ------------------ | ---------------- |
| query                  | [<code>PlayerQuery</code>](#PlayerQuery) |                    | Query parameters |
| [options]              | <code>object</code>                      |                    |                  |
| [options.merge]        | <code>Boolean</code>                     | <code>false</code> |                  |
| [options.removeMerged] | <code>Boolean</code>                     | <code>false</code> |                  |

<a name="MozambiqueAPI+bulkSearch"></a>

### mozambiqueAPI.bulkSearch(bulkQuery, [options]) ⇒ <code>Promise.&lt;Array.&lt;Player&gt;&gt;</code>

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)

| Param                  | Type                                             | Default            |
| ---------------------- | ------------------------------------------------ | ------------------ |
| bulkQuery              | [<code>BulkPlayerQuery</code>](#BulkPlayerQuery) |                    |
| [options]              | <code>object</code>                              |                    |
| [options.merge]        | <code>Boolean</code>                             | <code>false</code> |
| [options.removeMerged] | <code>Boolean</code>                             | <code>false</code> |

<a name="MozambiqueAPI+news"></a>

### mozambiqueAPI.news([lang]) ⇒ <code>Promise.&lt;Array.&lt;ApexNews&gt;&gt;</code>

Get recent news about Apex Legends

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Promise.&lt;Array.&lt;ApexNews&gt;&gt;</code> - Array of Apex Legends news

| Param  | Type                | Default                        | Description          |
| ------ | ------------------- | ------------------------------ | -------------------- |
| [lang] | <code>String</code> | <code>&quot;en-us&quot;</code> | Language of the news |

<a name="MozambiqueAPI+server"></a>

### mozambiqueAPI.server() ⇒ [<code>Promise.&lt;Servers&gt;</code>](#Servers)

Get server status for Origin, EA, Apex Legends and apexlegendsapi API

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: [<code>Promise.&lt;Servers&gt;</code>](#Servers) - Object with status of all servers  
<a name="MozambiqueAPI+history"></a>

### mozambiqueAPI.history(action, [query], [limit], [start], [end]) ⇒ <code>Promise.&lt;Object&gt;</code>

Avaliable for everyone but with limitations depending on your api access type

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info

| Param   | Type                                     | Default         | Description                                               |
| ------- | ---------------------------------------- | --------------- | --------------------------------------------------------- |
| action  | <code>String</code>                      |                 | Action for the Match History API (info, get, delete, add) |
| [query] | [<code>PlayerQuery</code>](#PlayerQuery) |                 | Query parameters                                          |
| [limit] | <code>Number</code>                      | <code>-1</code> | Limit of events to get on action get. -1 is no limit      |
| [start] | <code>Number</code>                      |                 | Start UNIX Timestamp                                      |
| [end]   | <code>Number</code>                      |                 | End UNIX Timestamp                                        |

<a name="MozambiqueAPI+mapRotation"></a>

### mozambiqueAPI.mapRotation() ⇒ [<code>Promise.&lt;MapRotationData&gt;</code>](#MapRotationData)

Get the map rotation

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
<a name="MozambiqueAPI+origin"></a>

### mozambiqueAPI.origin(player, [showAllHits]) ⇒ <code>Promise.&lt;(OriginData\|Array.&lt;OriginData&gt;)&gt;</code>

Search a Origin user

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)

| Param         | Type                 | Default            | Description                                                                         |
| ------------- | -------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| player        | <code>String</code>  |                    | player name                                                                         |
| [showAllHits] | <code>Boolean</code> | <code>false</code> | If true, get all possible hits for the given player name and returns it in an array |

<a name="MozambiqueAPI+announcements"></a>

### mozambiqueAPI.announcements() ⇒ [<code>Promise.&lt;Announcement&gt;</code>](#Announcement)

Get the latest announcement of [apexlegendsstatus](https://apexlegendsstatus.com)

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
<a name="MozambiqueAPI+nameToUID"></a>

### mozambiqueAPI.nameToUID(query) ⇒ <code>Promise.&lt;(NameToUIDData\|OriginData)&gt;</code>

Get the UID using the player name

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Promise.&lt;(NameToUIDData\|OriginData)&gt;</code> - JSON Object with uid or [OriginData](#OriginData)

| Param          | Type                                     | Description     |
| -------------- | ---------------------------------------- | --------------- |
| query          | [<code>PlayerQuery</code>](#PlayerQuery) |                 |
| query.player   | <code>String</code>                      | player name     |
| query.platform | <code>String</code>                      | player platform |

<a name="MozambiqueAPI+gamedata"></a>

### ~~mozambiqueAPI.gamedata(dataType) ⇒ <code>Object</code>~~

**_Deprecated_**

Avaliable data types:
assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Object</code> - Object with requested game data

| Param    | Type                | Description            |
| -------- | ------------------- | ---------------------- |
| dataType | <code>String</code> | Type of data requested |

<a name="PlayerQuery"></a>

## PlayerQuery : <code>Object</code>

Player query

**Kind**: global typedef  
**Properties**

| Name     | Type                                       | Description                                             |
| -------- | ------------------------------------------ | ------------------------------------------------------- |
| [player] | <code>String</code>                        | Player in-game name, obligatory if uid is not specified |
| [uid]    | <code>String</code> \| <code>Number</code> | Player UID, obligatory if player name is not specified  |
| platform | <code>String</code>                        | Player platform                                         |

<a name="BulkPlayerQuery"></a>

## BulkPlayerQuery : <code>Object</code>

Bulk player query

**Kind**: global typedef  
**Properties**

| Name      | Type                                                                   | Description                                                              |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [players] | <code>Array.&lt;String&gt;</code>                                      | Players in-game name, obligatory if uid is not specified                 |
| [uids]    | <code>Array.&lt;String&gt;</code> \| <code>Array.&lt;Number&gt;</code> | Players UID, obligatory if player name is not specified                  |
| platform  | <code>String</code>                                                    | Players platform, has to be the same for every player in the bulk search |

<a name="NameToUIDData"></a>

## NameToUIDData : <code>Object</code>

NameToUID data

**Kind**: global typedef  
**Properties**

| Name   | Type                                       | Description                    |
| ------ | ------------------------------------------ | ------------------------------ |
| result | <code>String</code> \| <code>Number</code> | The uid of the provided player |

<a name="Player"></a>

## Player : <code>Object</code>

Player data object

**Kind**: global typedef  
**Properties**

| Name                                              | Type                                                            | Description                                                        |
| ------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| global                                            | <code>Object</code>                                             |                                                                    |
| global.name                                       | <code>String</code>                                             | In-Game player name                                                |
| global.uid                                        | <code>Number</code>                                             | Unique identifier                                                  |
| global.avatar                                     | <code>String</code>                                             | Only available for PC players                                      |
| global.platform                                   | <code>String</code>                                             |                                                                    |
| global.level                                      | <code>Number</code>                                             |                                                                    |
| global.toNextLevelPercent                         | <code>Number</code>                                             |                                                                    |
| global.internalUpdateCount                        | <code>Number</code>                                             |                                                                    |
| global.bans                                       | <code>Object</code>                                             |                                                                    |
| global.bans.isActive                              | <code>Boolean</code>                                            |                                                                    |
| global.bans.remainingSeconds                      | <code>Number</code>                                             |                                                                    |
| global.bans.last_banReason                        | <code>String</code>                                             |                                                                    |
| global.rank                                       | <code>Object</code>                                             |                                                                    |
| global.rank.rankScore                             | <code>Number</code>                                             |                                                                    |
| global.rank.rankName                              | <code>String</code>                                             |                                                                    |
| global.rank.rankDiv                               | <code>Number</code>                                             |                                                                    |
| global.rank.ladderPos                             | <code>Number</code>                                             |                                                                    |
| global.rank.rankImg                               | <code>String</code>                                             |                                                                    |
| global.rank.rankedSeason                          | <code>String</code>                                             |                                                                    |
| global.battlepass                                 | <code>Object</code>                                             |                                                                    |
| global.battlepass.level                           | <code>String</code>                                             | Current season battle pass level                                   |
| global.battlepass.history                         | <code>Object</code>                                             | Level history for all seasons                                      |
| global.battlepass.history.season1                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season2                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season3                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season4                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season5                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season6                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season7                 | <code>Number</code>                                             |                                                                    |
| global.battlepass.history.season8                 | <code>Number</code>                                             |                                                                    |
| global.badges                                     | [<code>Array.&lt;Badge&gt;</code>](#Badge) \| <code>null</code> |                                                                    |
| realtime                                          | <code>Object</code>                                             | realtime data                                                      |
| realtime.lobbyState                               | <code>String</code>                                             |                                                                    |
| realtime.isOnline                                 | <code>Number</code>                                             |                                                                    |
| realtime.isInGame                                 | <code>Number</code>                                             |                                                                    |
| realtime.canJoin                                  | <code>Number</code>                                             |                                                                    |
| realtime.partyFull                                | <code>Number</code>                                             |                                                                    |
| realtime.selectedLegend                           | <code>String</code>                                             |                                                                    |
| realtime.currentState                             | <code>String</code>                                             |                                                                    |
| realtime.currentStateSinceTimestamp               | <code>Number</code>                                             |                                                                    |
| realtime.currentStateAsText                       | <code>String</code>                                             |                                                                    |
| legends                                           | <code>Object</code>                                             |                                                                    |
| legends.selected                                  | [<code>Legend</code>](#Legend)                                  | Current selected legend                                            |
| legends.all                                       | <code>Object</code>                                             | All legends                                                        |
| legends.all.Bangalore                             | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Bloodhound                            | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Lifeline                              | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Caustic                               | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Gibraltar                             | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Mirage                                | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Pathfinder                            | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Wraith                                | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Octane                                | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Wattson                               | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Crypto                                | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Revenant                              | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Loba                                  | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Rampart                               | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Horizon                               | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Fuse                                  | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Valkyrie                              | [<code>Legend</code>](#Legend)                                  |                                                                    |
| legends.all.Seer                                  | [<code>Legend</code>](#Legend)                                  |                                                                    |
| mozambiquehere_internal                           | <code>Object</code>                                             | Internal API data                                                  |
| mozambiquehere_internal.APIAccessType             | <code>String</code>                                             |                                                                    |
| mozambiquehere_internal.ClusterID                 | <code>String</code>                                             |                                                                    |
| mozambiquehere_internal.rate_limit                | <code>Object</code>                                             |                                                                    |
| mozambiquehere_internal.rate_limit.max_per_second | <code>Number</code>                                             |                                                                    |
| mozambiquehere_internal.rate_limit.current_req    | <code>String</code>                                             |                                                                    |
| mozambiquehere_internal.clusterSrv                | <code>String</code>                                             |                                                                    |
| total                                             | <code>Object</code>                                             | Total stats from all legends together                              |
| total.kd                                          | <code>Number</code>                                             | Will always be -1 unless kills and games played trackers are found |

<a name="Legend"></a>

## Legend : <code>Object</code>

Legend data object

**Kind**: global typedef  
**Properties**

| Name                 | Type                                                   |
| -------------------- | ------------------------------------------------------ |
| LegendName           | <code>String</code>                                    |
| [data]               | [<code>Array.&lt;Tracker&gt;</code>](#Tracker)         |
| [gameInfo]           | <code>Object</code>                                    |
| gameInfo.skin        | <code>String</code>                                    |
| gameInfo.skinRarity  | <code>String</code>                                    |
| gameInfo.frame       | <code>String</code>                                    |
| gameInfo.frameRarity | <code>String</code>                                    |
| gameInfo.pose        | <code>String</code>                                    |
| gameInfo.poseRarity  | <code>String</code>                                    |
| gameInfo.intro       | <code>String</code>                                    |
| gameInfo.introRarity | <code>String</code>                                    |
| gameInfo.badges      | [<code>Array.&lt;LegendBadge&gt;</code>](#LegendBadge) |
| ImgAssets            | <code>Object</code>                                    |
| ImgAssets.icon       | <code>String</code>                                    |
| ImgAssets.banner     | <code>String</code>                                    |

<a name="Tracker"></a>

## Tracker : <code>Object</code>

Tracker data object

**Kind**: global typedef  
**Properties**

| Name                            | Type                                       |
| ------------------------------- | ------------------------------------------ |
| name                            | <code>String</code>                        |
| value                           | <code>String</code> \| <code>Number</code> |
| key                             | <code>String</code>                        |
| [rank]                          | <code>object</code>                        |
| rank.rankPos                    | <code>Number</code>                        |
| rank.topPercent                 | <code>Number</code>                        |
| [rankPlatformSpecific]          | <code>object</code>                        |
| rankPlatformSpecific.rankPos    | <code>Number</code>                        |
| rankPlatformSpecific.topPercent | <code>Number</code>                        |

<a name="Badge"></a>

## Badge : <code>Object</code>

Badge data object

**Kind**: global typedef  
**Properties**

| Name  | Type                                       |
| ----- | ------------------------------------------ |
| name  | <code>String</code>                        |
| value | <code>String</code> \| <code>Number</code> |

<a name="LegendBadge"></a>

## LegendBadge : <code>Object</code>

Legend Badge data object

**Kind**: global typedef  
**Properties**

| Name     | Type                                       |
| -------- | ------------------------------------------ |
| name     | <code>String</code>                        |
| value    | <code>String</code> \| <code>Number</code> |
| category | <code>String</code>                        |

<a name="ApexNews"></a>

## ApexNews : <code>Object</code>

Apex Legends News Object

**Kind**: global typedef  
**Properties**

| Name       | Type                |
| ---------- | ------------------- |
| title      | <code>String</code> |
| link       | <code>String</code> |
| img        | <code>String</code> |
| short_desc | <code>String</code> |

<a name="Servers"></a>

## Servers : <code>Object</code>

Servers status data object

**Kind**: global typedef  
**Properties**

| Name                                              | Type                                   |
| ------------------------------------------------- | -------------------------------------- |
| Origin_login                                      | [<code>Regions</code>](#Regions)       |
| EA_novafusion                                     | [<code>Regions</code>](#Regions)       |
| EA_accounts                                       | [<code>Regions</code>](#Regions)       |
| ApexOauth_Crossplay                               | [<code>Regions</code>](#Regions)       |
| selfCoreTest                                      | <code>Object</code>                    |
| selfCoreTest.Status-website                       | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Stats-API                            | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Overflow-#1                          | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Overflow-#2                          | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Origin-API                           | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Playstation-API                      | [<code>RegionData</code>](#RegionData) |
| selfCoreTest.Xbox-API                             | [<code>RegionData</code>](#RegionData) |
| otherPlatforms                                    | <code>Object</code>                    |
| otherPlatforms.Playstation-Network                | <code>Object</code>                    |
| otherPlatforms.Playstation-Network.Status         | <code>String</code>                    |
| otherPlatforms.Playstation-Network.QueryTimestamp | <code>Number</code>                    |
| otherPlatforms.Xbox-Live                          | <code>Object</code>                    |
| otherPlatforms.Xbox-Live.Status                   | <code>String</code>                    |
| otherPlatforms.Xbox-Live.QueryTimestamp           | <code>Number</code>                    |

<a name="Regions"></a>

## Regions : <code>Object</code>

Regions object

**Kind**: global typedef  
**Properties**

| Name         | Type                                   |
| ------------ | -------------------------------------- |
| EU-West      | [<code>RegionData</code>](#RegionData) |
| EU-East      | [<code>RegionData</code>](#RegionData) |
| US-West      | [<code>RegionData</code>](#RegionData) |
| US-Central   | [<code>RegionData</code>](#RegionData) |
| US-East      | [<code>RegionData</code>](#RegionData) |
| SouthAmerica | [<code>RegionData</code>](#RegionData) |
| Asia         | [<code>RegionData</code>](#RegionData) |

<a name="RegionData"></a>

## RegionData : <code>Object</code>

Region data object

**Kind**: global typedef  
**Properties**

| Name           | Type                |
| -------------- | ------------------- |
| Status         | <code>String</code> |
| HTTPCode       | <code>Number</code> |
| ResponseTime   | <code>Number</code> |
| QueryTimestamp | <code>Number</code> |

<a name="MapData"></a>

## MapData : <code>Object</code>

Map data

**Kind**: global typedef  
**Properties**

| Name                       | Type                |
| -------------------------- | ------------------- |
| current                    | <code>Object</code> |
| current.start              | <code>Number</code> |
| current.end                | <code>Number</code> |
| current.readableDate_start | <code>String</code> |
| current.readableDate_end   | <code>String</code> |
| current.map                | <code>String</code> |
| current.DurationInSecs     | <code>Number</code> |
| current.DurationInMinutes  | <code>Number</code> |
| current.remainingSecs      | <code>Number</code> |
| current.remainingMins      | <code>Number</code> |
| current.remainingTimer     | <code>String</code> |
| next                       | <code>Object</code> |
| next.start                 | <code>Number</code> |
| next.end                   | <code>Number</code> |
| next.readableDate_start    | <code>String</code> |
| next.readableDate_end      | <code>String</code> |
| next.map                   | <code>String</code> |
| next.DurationInSecs        | <code>Number</code> |
| next.DurationInMinutes     | <code>Number</code> |

<a name="MapRotationData"></a>

## MapRotationData : <code>Object</code>

Map rotation data

**Kind**: global typedef  
**Properties**

| Name          | Type                             | Description       |
| ------------- | -------------------------------- | ----------------- |
| battle_royale | [<code>MapData</code>](#MapData) |                   |
| arenas        | [<code>MapData</code>](#MapData) |                   |
| ranked        | [<code>MapData</code>](#MapData) | May be incomplete |

<a name="OriginData"></a>

## OriginData : <code>Object</code>

Origin data

**Kind**: global typedef  
**Properties**

| Name   | Type                |
| ------ | ------------------- |
| name   | <code>String</code> |
| uid    | <code>String</code> |
| pid    | <code>String</code> |
| avatar | <code>String</code> |

<a name="Announcement"></a>

## Announcement : <code>Object</code>

Announcement of [apexlegendsstatus](https://apexlegendsstatus.com)

**Kind**: global typedef  
**Properties**

| Name     | Type                |
| -------- | ------------------- |
| Release  | <code>Number</code> |
| Content  | <code>String</code> |
| Duration | <code>Number</code> |
