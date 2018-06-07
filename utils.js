const { spawn } = require('child_process');

const runCommand = (cmd, args, options) => (
  new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign({
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true,
      }, options)
    )

    spwan.on('exit', resolve);
  })
);

const installMsg = (data) => (
  !data.autoInstall ? 'npm install\n' : ''
);

const installDependencies = (cwd, color) => {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`);
  console.log('# ========================\n');
  return runCommand('npm', ['install'], { cwd });
};

const printMessage = (data, { green, yellow }) => {
  const header = `# ${green('Project initialization finished!')}\n# ========================\nTo get started:\n`;
  const message = `${yellow(`${data.inPlace ? '' : `cd ${data.destDirName}\n`}${installMsg(data)}npm run dev`)}`;
  console.log(`${header}${message}`);
}

exports.printMessage = printMessage;
exports.installDependencies = installDependencies;
