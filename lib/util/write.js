const fs = require("fs-extra");
const path = require("path");

const { FILE_NAME } = require("../config");

exports.writeFile = function(config) {
  const file = path.join(process.cwd(), FILE_NAME);
  fs.outputFileSync(file, JSON.stringify(config, null, 2));
}