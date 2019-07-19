
const getTarball = require('./getTarball');
const extractTarball = require('./extractTarball');

module.exports = ({ npmName, registry, destDir }) => {
  return getTarball(npmName, registry)
    .then((url) => {
      return extractTarball(url, destDir);
    });
};

