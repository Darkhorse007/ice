const os = require('os');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const util = require('util');
const rimraf = require('rimraf');
const execa = require('execa');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const mkdirp = require('mkdirp');
const filecopy = require('filecopy');

const cliBuilder = require.resolve('electron-builder/out/cli/cli.js');
const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const isDev = process.env.NODE_ENV === 'development';

gulp.task('dist', (done) => {
  let target;
  if (os.platform() === 'win32') {
    target = 'win';
  } else {
    target = 'mac';
  }
  const buildDir = path.join(__dirname, 'build');
  const distDir = path.join(__dirname, 'dist');
  const serverDir = path.join(buildDir, 'server');

  async function build() {
    if (fs.existsSync(distDir)) {
      await rimrafAsync(distDir);
    }

    const params = [`--${target}`, '--publish', 'always'];
    const childProcess = execa(
      cliBuilder,
      params,
      { stdio: 'inherit' }
    );
    childProcess.on('close', (code) => {
      if (code === 0) {
        console.log('打包完成');
      } else {
        console.error('打包失败');
      }
      done(code);
    });
  }

  async function getServerCode() {
    const tarball = await getNpmTarball('iceworks-server');
    await getAndExtractTarball(serverDir, tarball);
  }

  async function copyAppFiles() {
    await filecopy(
      'app/*',
      'build'
    );
  }

  async function setPackage() {
    const packageJSONFileName = 'package.json';
    const projectPackageJSONPath = path.join(__dirname, packageJSONFileName);
    const projectPackageJSON = JSON.parse((await readFileAsync(projectPackageJSONPath)).toString());

    const serverPackageJSONPath = path.join(serverDir, packageJSONFileName);
    const serverProjectPackageJSON = JSON.parse((await readFileAsync(serverPackageJSONPath)).toString());

    projectPackageJSON.dependencies = Object.assign({}, serverProjectPackageJSON.dependencies, projectPackageJSON.dependencies);
    projectPackageJSON.main = './index.js';
    delete projectPackageJSON.build;

    await writeFileAsync(path.join(buildDir, packageJSONFileName), `${JSON.stringify(projectPackageJSON, null, 2)}\n`, 'utf-8');

    await execa.shell('npm install', {
      stdio: 'inherit',
      cwd: buildDir,
    });
  }

  async function devDist() {
    await copyAppFiles();

    await setPackage();

    build();
  }

  async function dist() {
    if (fs.existsSync(buildDir)) {
      await rimrafAsync(buildDir);
    }
    await mkdirpAsync(buildDir);

    await getServerCode();

    await copyAppFiles();

    await setPackage();

    build();
  }

  if (isDev) {
    devDist();
  } else {
    dist();
  }
});
