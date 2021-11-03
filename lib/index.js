const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const pkg = require("../package.json");
const { FILE_NAME } = require("./config");

program
  .version(pkg.version)
  .usage('<command> [option]');

program
  .command('init')
  .description('create init config file')
  // .option('-c, --filename <filename>', 'Specify config file name', 'fe.deploy.json')
  .option('-f, --force', 'Overwrite target config file if it exists', false)
  .action(({
    force
  }) => {

    const options = {
      filename: FILE_NAME,
      force
    }

    require("./util/creator")(options);
  })

program
  .description('deploy ...')
  .action(() => {

    const file = path.join(process.cwd(), FILE_NAME);
    if (!fs.pathExistsSync(file)) {
      throw new Error(`please run (fe init) or create '${FILE_NAME}' file then continue .`);
    }
    const options = fs.readJsonSync(file, {
      throws: false
    });

    require("./util/deploy")(options);

  })

program.parse(process.argv);