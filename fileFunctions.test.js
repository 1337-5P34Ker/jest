
'use strict';

jest.mock('fs');

describe('file access to mocked file system', () => {
  const MOCK_FILE_INFO = {
    '/path/1/file1.js': 'content file 1',
    '/path/1/file2.txt': 'content file 2',
  };
  const MOCK_FILE_CONTENT = {
    '/path/2/another.txt': 'some text',
  }

  beforeEach(() => {
    // Set up some mocked file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
    require('fs').__setMockFileContent(MOCK_FILE_CONTENT);
  });

  test('includes all files in the directory in the summary', () => {
    const fileFunctions = require('./fileFunctions');
    const fileSummary = fileFunctions.summarizeFilesInDirectorySync(
      '/path/1',
    );

    expect(fileSummary.length).toBe(2);
  })

  test('content of file is correct', () => {
    const fileFunctions = require('./fileFunctions');
    const content = fileFunctions.getContent(
      '/path/2/another.txt',
    );

    expect(content).toBe('some text');

  });
})
