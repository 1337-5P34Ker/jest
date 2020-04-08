
'use strict';

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({
    directory,
    fileName,
  }));
}

function getContent(path) {
  return fs.readFileSync(path);
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
exports.getContent = getContent;