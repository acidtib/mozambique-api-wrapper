require("dotenv").config();
const MozambiqueAPI = require("../index.js");
const TEST_TOKEN = process.env.TEST_TOKEN

const client = new MozambiqueAPI(TEST_TOKEN);

client.compare({ player: "KingBR", platform: "PC" }, { player: "HeyImLIFELINE", platform: "PC" })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

process.exit(0);