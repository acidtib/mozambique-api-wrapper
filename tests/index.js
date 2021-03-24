const MozambiqueAPI = require("../index.js");
require("dotenv").config();

const TEST_TOKEN = process.env.TEST_TOKEN || null;

if (["null", "undefined"].includes(typeof TEST_TOKEN)) {
  console.warn("Please provide an API token for testing");
  process.exit(0);
}

var client = new MozambiqueAPI(TEST_TOKEN);
var c = true;

/**
 * @param {Error} err
 * @param {String} method
 */
function newError(err, method) {
  console.error(`\n${err.message} on method ${method}\n${err.stack}\n`);
  c = false;
}

/**
 * @param {Number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function test() {
  client
    .search({ player: "KingBR", platform: "PC" })
    .then((resp) => {
      console.log("Search: OK");
    })
    .catch((err) => {
      console.log("Search: ERROR");
      newError(err, "search");
    });

  await sleep(1000);

  client
    .news()
    .then((resp) => {
      console.log("News: OK");
    })
    .catch((err) => {
      console.log("News: ERROR");
      newError(err, "news");
    });

  await sleep(1000);

  client
    .server()
    .then((resp) => {
      console.log("Server: OK");
    })
    .catch((err) => {
      console.log("Server: ERROR");
      newError(err, "server");
    });

  await sleep(1000);

  client
    .history("info")
    .then((resp) => {
      console.log("History: OK");
    })
    .catch((err) => {
      console.log("History: ERROR");
      newError(err, "history");
    });

  await sleep(2000);

  client
    .origin("KingBR", true)
    .then((resp) => {
      console.log("Origin: OK");
    })
    .catch((err) => {
      console.log("Origin: ERROR");
      newError(err, "origin");
    });

  await sleep(2000);

  client
    .mapRotation()
    .then((resp) => {
      console.log("Map Rotation: OK");
    })
    .catch((err) => {
      console.log("Map Rotation: ERROR");
      newError(err, "mapRotation");
    });

  /*
  await client
    .compare(
      { player: "KingBR", platform: "PC" },
      { player: "HeyImLIFELINE", platform: "PC" }
    )
    .then((resp) => {
      console.log("Compare: OK");
    })
    .catch((err) => {
      console.log("Compare: ERROR");
      newError(err, "compare");
    });
  */

  if (c) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

test();
