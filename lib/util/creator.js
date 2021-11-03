const fs = require("fs-extra");
const path = require("path");

const { writeFile } = require("./write");

async function create(options) {

  const { filename, force } = options;

  const file = path.join(process.cwd(), filename);
  
  if (force) {
    fs.removeSync(file);
  }

  fs.ensureFileSync(file);

  const configObj = fs.readJsonSync(file, {
    throws: false
  });

  const defaultOptions = {
    dirToCopy: "dist",
    deployTo: "~",
    key: "",
    server: "",
    ...configObj
  }

  writeFile(defaultOptions);

}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.log(err);
  })
}