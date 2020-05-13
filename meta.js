const path = require('path');
const { installDependencies, printMessage } = require('./utils.js');

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Package name (lowercase, one word, may contain hyphens and underscores',
    },

    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },

    appTitle: {
      type: 'string',
      message: 'App Title',
      default: 'App Title',
    },

    autoInstall: {
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created?',
      choices: [{
        name: 'Yes',
        value: true,
        short: 'yes',
      }, {
        name: 'No, I will handle that myself',
        value: false,
        short: 'no',
      }],
    }
  },

  complete(data, { chalk }) {
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    const { green } = chalk;

    if (data.autoInstall) {
      installDependencies(cwd, green)
        .then(() => {
          printMessage(data, green);
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e);
        })
    } else {
      printMessage(data, green);
    }
  },
};
