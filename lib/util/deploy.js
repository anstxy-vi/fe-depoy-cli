const path = require("path");
const sshPool = require("ssh-pool");
const tasuku = require("tasuku");

const {
  checkConfig
} = require("./check");

async function deploy(options) {
  checkConfig(options);

  let conn = null;
  tasuku(`connect to ${options.server}`, ({
    setTitle
  }) => {
    conn = new sshPool.Connection({
      remote: options.server,
      key: path.join(process.cwd(), options.key),
      log: console.log
    });
    setTitle("connection success")
  })

  tasuku(`cp '${options.dirToCopy}' to '${options.server}:${options.deployTo}'`, ({
    setTitle
  }) => {
    conn.copyToRemote(path.join(process.cwd(), options.dirToCopy), options.deployTo)
      .then(() => {
        setTitle("success to copy");
      })
      .catch((err) => {})
  })

}

module.exports = (...args) => {
  return deploy(...args).catch(err => {
    console.log(err);
  })
}