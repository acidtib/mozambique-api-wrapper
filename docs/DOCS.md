## Classes

<dl>
<dt><a href="#MozambiqueAPI">MozambiqueAPI</a></dt>
<dd><p>Core of mozambique-api-wrapper</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Player">Player</a> : <code>Object</code></dt>
<dd><p>Player data object</p>
</dd>
<dt><a href="#Legend">Legend</a> : <code>Object</code></dt>
<dd><p>Legend data object</p>
</dd>
<dt><a href="#TrackerObj">TrackerObj</a> : <code>Object</code></dt>
<dd><p>Tracker data object</p>
</dd>
<dt><a href="#BadgeObj">BadgeObj</a> : <code>Object</code></dt>
<dd><p>Badge data object</p>
</dd>
<dt><a href="#ApexNews">ApexNews</a> : <code>Object</code></dt>
<dd><p>Apex Legends News Object</p>
</dd>
<dt><a href="#ServersObj">ServersObj</a> : <code>Object</code></dt>
<dd><p>Servers status data object</p>
</dd>
<dt><a href="#RegionsObj">RegionsObj</a> : <code>Object</code></dt>
<dd><p>Regions data object</p>
</dd>
<dt><a href="#RegionDataObj">RegionDataObj</a> : <code>Object</code></dt>
<dd><p>Region data object</p>
</dd>
<dt><a href="#ComparedData">ComparedData</a> : <code>Object</code></dt>
<dd><p>Compared players data object</p>
</dd>
</dl>

<a name="MozambiqueAPI"></a>

## MozambiqueAPI
Core of mozambique-api-wrapper

**Kind**: global class  

* [MozambiqueAPI](#MozambiqueAPI)
    * [new MozambiqueAPI(apiKey, [version])](#new_MozambiqueAPI_new)
    * [.search(query)](#MozambiqueAPI+search) ⇒ [<code>Player</code>](#Player)
    * [.news([lang])](#MozambiqueAPI+news) ⇒ [<code>Array.&lt;ApexNews&gt;</code>](#ApexNews)
    * [.server()](#MozambiqueAPI+server) ⇒ [<code>ServersObj</code>](#ServersObj)
    * [.history(action, [query])](#MozambiqueAPI+history) ⇒ <code>Object</code>
    * [.compare(query1, query2)](#MozambiqueAPI+compare) ⇒ [<code>ComparedData</code>](#ComparedData)
    * ~~[.gamedata(dataType)](#MozambiqueAPI+gamedata) ⇒ <code>Object</code>~~

<a name="new_MozambiqueAPI_new"></a>

### new MozambiqueAPI(apiKey, [version])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| apiKey | <code>String</code> |  | Your [Apex Legends API](https://apexlegendsapi.com) Auth Key |
| [version] | <code>Number</code> | <code>5</code> | API version to use |

<a name="MozambiqueAPI+search"></a>

### mozambiqueAPI.search(query) ⇒ [<code>Player</code>](#Player)
Search a player using player name or UID

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: [<code>Player</code>](#Player) - Object with player info  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query parameters |
| [query.player] | <code>String</code> | Player name |
| [query.uid] | <code>String</code> \| <code>Number</code> | Player UID |
| [query.platform] | <code>String</code> | Player platform |

<a name="MozambiqueAPI+news"></a>

### mozambiqueAPI.news([lang]) ⇒ [<code>Array.&lt;ApexNews&gt;</code>](#ApexNews)
Get recent news about Apex Legends

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: [<code>Array.&lt;ApexNews&gt;</code>](#ApexNews) - Array of Apex Legends news  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [lang] | <code>String</code> | <code>&quot;en-us&quot;</code> | Language of the news |

<a name="MozambiqueAPI+server"></a>

### mozambiqueAPI.server() ⇒ [<code>ServersObj</code>](#ServersObj)
Get server status for Origin, EA, Apex Legends and apexlegendsapi API

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: [<code>ServersObj</code>](#ServersObj) - Object with status of all servers  
<a name="MozambiqueAPI+history"></a>

### mozambiqueAPI.history(action, [query]) ⇒ <code>Object</code>
Avaliable for everyone but with limitations depending on your api access type

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Object</code> - Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | Action for the Match History API (info, get, delete, add) |
| [query] | <code>Object</code> | Query parameters |
| [query.player] | <code>String</code> | Player name |
| [query.uid] | <code>String</code> \| <code>Number</code> | Player UID |
| [query.platform] | <code>String</code> | Player platform |

<a name="MozambiqueAPI+compare"></a>

### mozambiqueAPI.compare(query1, query2) ⇒ [<code>ComparedData</code>](#ComparedData)
Compare two players

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  

| Param | Type | Description |
| --- | --- | --- |
| query1 | <code>Object</code> | Query parameters |
| [query1.player] | <code>String</code> | Player name |
| [query1.uid] | <code>String</code> \| <code>Number</code> | Player UID |
| [query1.platform] | <code>String</code> | Player platform |
| query2 | <code>Object</code> | Query parameters |
| [query2.player] | <code>String</code> | Player name |
| [query2.uid] | <code>String</code> \| <code>Number</code> | Player UID |
| [query2.platform] | <code>String</code> | Player platform |

<a name="MozambiqueAPI+gamedata"></a>

### ~~mozambiqueAPI.gamedata(dataType) ⇒ <code>Object</code>~~
***Deprecated***

WARNING: endpoint data not updated anymore

**Kind**: instance method of [<code>MozambiqueAPI</code>](#MozambiqueAPI)  
**Returns**: <code>Object</code> - Object with requested game data  

| Param | Type | Description |
| --- | --- | --- |
| dataType | <code>String</code> | Type of data requested |

<a name="Player"></a>

## Player : <code>Object</code>
Player data object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| global | <code>Object</code> |  |
| global.name | <code>String</code> | In-Game player name |
| global.uid | <code>Number</code> |  |
| global.avatar | <code>String</code> | Only available for PC players |
| global.platform | <code>String</code> |  |
| global.level | <code>Number</code> |  |
| global.toNextLevelPercent | <code>Number</code> |  |
| global.internalUpdateCount | <code>Number</code> |  |
| global.bans | <code>Object</code> |  |
| global.bans.isActive | <code>Boolean</code> |  |
| global.bans.remainingSeconds | <code>Number</code> |  |
| global.bans.last_banReason | <code>String</code> |  |
| global.rank | <code>Object</code> |  |
| global.rank.rankScore | <code>Number</code> |  |
| global.rank.rankName | <code>String</code> |  |
| global.rank.rankDiv | <code>Number</code> |  |
| global.rank.ladderPos | <code>Number</code> |  |
| global.rank.rankImg | <code>String</code> |  |
| global.rank.rankedSeason | <code>String</code> |  |
| global.battlepass | <code>Object</code> |  |
| global.battlepass.level | <code>String</code> | Current season battle pass level |
| global.battlepass.history | <code>Object</code> | Level history for all seasons |
| global.battlepass.history.season1 | <code>Number</code> |  |
| global.battlepass.history.season2 | <code>Number</code> |  |
| global.battlepass.history.season3 | <code>Number</code> |  |
| global.battlepass.history.season4 | <code>Number</code> |  |
| global.battlepass.history.season5 | <code>Number</code> |  |
| global.battlepass.history.season6 | <code>Number</code> |  |
| global.battlepass.history.season7 | <code>Number</code> |  |
| global.battlepass.history.season8 | <code>Number</code> |  |
| realtime | <code>Object</code> | realtime data |
| realtime.lobbyState | <code>String</code> |  |
| realtime.isOnline | <code>Number</code> |  |
| realtime.isInGame | <code>Number</code> |  |
| realtime.canJoin | <code>Number</code> |  |
| realtime.partyFull | <code>Number</code> |  |
| realtime.selectedLegend | <code>String</code> |  |
| legends | <code>Object</code> |  |
| legends.selected | [<code>Legend</code>](#Legend) |  |
| legends.all | <code>Object</code> |  |
| legends.all.Bangalore | [<code>Legend</code>](#Legend) |  |
| legends.all.Bloodhound | [<code>Legend</code>](#Legend) |  |
| legends.all.Lifeline | [<code>Legend</code>](#Legend) |  |
| legends.all.Caustic | [<code>Legend</code>](#Legend) |  |
| legends.all.Gibraltar | [<code>Legend</code>](#Legend) |  |
| legends.all.Mirage | [<code>Legend</code>](#Legend) |  |
| legends.all.Pathfinder | [<code>Legend</code>](#Legend) |  |
| legends.all.Wraith | [<code>Legend</code>](#Legend) |  |
| legends.all.Octane | [<code>Legend</code>](#Legend) |  |
| legends.all.Wattson | [<code>Legend</code>](#Legend) |  |
| legends.all.Crypto | [<code>Legend</code>](#Legend) |  |
| legends.all.Revenant | [<code>Legend</code>](#Legend) |  |
| legends.all.Loba | [<code>Legend</code>](#Legend) |  |
| legends.all.Rampart | [<code>Legend</code>](#Legend) |  |
| legends.all.Horizon | [<code>Legend</code>](#Legend) |  |
| legends.all.Fuse | [<code>Legend</code>](#Legend) |  |
| mozambiquehere_internal | <code>Object</code> | Internal API data |
| mozambiquehere_internal.isNewToDB | <code>Boolean</code> |  |
| mozambiquehere_internal.claimedBy | <code>String</code> |  |
| mozambiquehere_internal.APIAccessType | <code>String</code> |  |
| mozambiquehere_internal.ClusterID | <code>String</code> |  |
| mozambiquehere_internal.rate_limit | <code>Object</code> |  |
| mozambiquehere_internal.rate_limit.max_per_second | <code>Number</code> |  |
| mozambiquehere_internal.rate_limit.current_req | <code>String</code> |  |
| total | <code>Object</code> |  |

<a name="Legend"></a>

## Legend : <code>Object</code>
Legend data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| LegendName | <code>String</code> | 
| data | [<code>Array.&lt;TrackerObj&gt;</code>](#TrackerObj) | 
| gameInfo | <code>Object</code> | 
| gameInfo.skin | <code>String</code> | 
| gameInfo.frame | <code>String</code> | 
| gameInfo.pose | <code>String</code> | 
| gameInfo.intro | <code>String</code> | 
| gameInfo.badges | [<code>Array.&lt;BadgeObj&gt;</code>](#BadgeObj) | 
| ImgAssets | <code>Object</code> | 
| ImgAssets.icon | <code>String</code> | 
| ImgAssets.banner | <code>String</code> | 

<a name="TrackerObj"></a>

## TrackerObj : <code>Object</code>
Tracker data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> \| <code>Number</code> | 
| key | <code>String</code> | 

<a name="BadgeObj"></a>

## BadgeObj : <code>Object</code>
Badge data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> \| <code>Number</code> | 

<a name="ApexNews"></a>

## ApexNews : <code>Object</code>
Apex Legends News Object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| title | <code>String</code> | 
| link | <code>String</code> | 
| img | <code>String</code> | 
| short_desc | <code>String</code> | 

<a name="ServersObj"></a>

## ServersObj : <code>Object</code>
Servers status data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Origin_login | [<code>RegionsObj</code>](#RegionsObj) | 
| EA_novafusion | [<code>RegionsObj</code>](#RegionsObj) | 
| EA_accounts | [<code>RegionsObj</code>](#RegionsObj) | 
| ApexOauth_PC | [<code>RegionsObj</code>](#RegionsObj) | 
| ApexOauth_PS4 | [<code>RegionsObj</code>](#RegionsObj) | 
| ApexOauth_X1 | [<code>RegionsObj</code>](#RegionsObj) | 
| ApexOauth_Steam | [<code>RegionsObj</code>](#RegionsObj) | 
| ApexOauth_Crossplay | [<code>RegionsObj</code>](#RegionsObj) | 
| Mozambiquehere_StatsAPI | [<code>RegionsObj</code>](#RegionsObj) | 

<a name="RegionsObj"></a>

## RegionsObj : <code>Object</code>
Regions data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| EU-West | [<code>RegionDataObj</code>](#RegionDataObj) | 
| EU-East | [<code>RegionDataObj</code>](#RegionDataObj) | 
| US-West | [<code>RegionDataObj</code>](#RegionDataObj) | 
| US-Central | [<code>RegionDataObj</code>](#RegionDataObj) | 
| US-East | [<code>RegionDataObj</code>](#RegionDataObj) | 
| SouthAmerica | [<code>RegionDataObj</code>](#RegionDataObj) | 
| Asia | [<code>RegionDataObj</code>](#RegionDataObj) | 

<a name="RegionDataObj"></a>

## RegionDataObj : <code>Object</code>
Region data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Status | <code>String</code> | 
| HTTPCode | <code>Number</code> | 
| ResponseTime | <code>Number</code> | 
| QueryTimestamp | <code>Number</code> | 

<a name="ComparedData"></a>

## ComparedData : <code>Object</code>
Compared players data object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| players | [<code>Array.&lt;Player&gt;</code>](#Player) | 
| data | <code>Object</code> | 
| data.trackers | [<code>Array.&lt;TrackerObj&gt;</code>](#TrackerObj) | 
| data.badges | [<code>Array.&lt;BadgeObj&gt;</code>](#BadgeObj) | 
