// fake fs
'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = {};
function __setMockFiles(newMockFiles) {
    mockFiles = {};
    for (const file in newMockFiles) {
        const dir = path.dirname(file);

        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
        mockFiles[dir].push(path.basename(file));
    }
    console.table(mockFiles);
}

let mockFile = {}
function __setMockFileContent(content) {
    mockFile = content;
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
    return mockFiles[directoryPath] || [];
}

// A custom version of `readFileSync` that reads from the special mocked out
// file set via __setMockFileContent
function readFileSync(filePath) {
    return mockFile[filePath] || '';
}


fs.__setMockFiles = __setMockFiles;
fs.__setMockFileContent = __setMockFileContent;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;

module.exports = fs;