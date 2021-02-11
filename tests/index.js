const MozambiqueAPI = require("../index.js");

const TEST_TOKEN = "test token here";

if (TEST_TOKEN == "test token here") {
  console.warn("Please provide an API token for testing");
  process.exit(0);
}

var client = new MozambiqueAPI(TEST_TOKEN);
var c = true;

function newError(err, method) {
  console.error(`\n${err.message} on method ${method}\n${err.stack}\n`);
  c = false;
}

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
  
  if(c) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

test();