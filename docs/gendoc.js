const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");

fs.writeFileSync("docs/DOCS.md", jsdoc2md.renderSync({ files: ["index.js"]}), { encoding: "utf8" });