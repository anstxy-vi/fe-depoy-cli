const fs = require("fs-extra");
const path = require("path");

exports.checkConfig = function(options) {

  if (!options.dirToCopy || !fs.pathExistsSync(path.join(process.cwd(), options.dirToCopy))) {
    throw new Error(`[dirToCopy]: ${options.dirToCopy} is not valid path`);
  }

  if (!options.deployTo) {
    throw new Error(`[deployTo]: server remote directory `);
  }

  if (!options.key || !fs.pathExistsSync(path.join(process.cwd(), options.key))) {
    throw new Error(`[key]: ${path.join(process.cwd(), options.key)} is not valid path`)
  }

  if (!options.server) {
    throw new Error(`[server]: should not empty`);
  }

}