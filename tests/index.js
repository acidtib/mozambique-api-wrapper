const MozambiqueAPI = require("../index.js");
const fs = require("fs");

const TEST_TOKEN = "test token here";

if (TEST_TOKEN == "test token here") {
  console.warn("Please provide an API token for testing");
  process.exit(1);
}

var client = new MozambiqueAPI(TEST_TOKEN);

function newError(err, method) {
  if (!fs.existsSync("testErrors")) fs.mkdirSync("testErrors");
  let logName = `testErrors/${method}.json`;
  fs.writeFileSync(logName, JSON.stringify(err, null, 2), {
    encoding: "utf8",
  });
  console.log(`Error log created at ${logName}`);
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

  await sleep(1000);

  client
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

  process.exit(0);
}

test();
