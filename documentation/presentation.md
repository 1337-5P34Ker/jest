---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
logoImg: "jest-logo.svg"
slideNumber: false
title: "Testing JAVASCRIPT with JEST"
---



// @ [Rocco Hundertmark](https://github.com/1337-5P34Ker)

// repo https://github.com/1337-5P34Ker/jest 

---

#### Why JEST?
All in one Framework
* test runner
* assertion library
* mocking
* code-coverage
* snapshots
* readable errors
* minimal config
* fast (parallelzation)
* IDE support (VS Code)

---


#### How to install

```
npm init
npm install --save-dev --global jest
npm install --save @types/jest
```
---

#### Syntax (Matchers)

more than 50 matchers avail.
(https://jestjs.io/docs/en/using-matchers)
```js
// Common
.toBe(value)
.toEqual(value)
...
// Truthiness
.toBeDefined()
.toBeFalsy()
...
// Numbers
.toBeGreaterThan(3);
.toBeGreaterThanOrEqual(3.5);
.toBeLessThan(5);
...
// Strings
.toMatch(regExp)
...
// Arrays and iterables
.toContain()
...
// Exceptions
.toThrow('Yoda is not a Sith');
.toThrow(/JEDI/); // any error with 'JEDI'
...
// Mocks
 .toHaveBeenCalled() 
 .toHaveBeenCalledWith(arg1, arg2);
 ...
```

--

#### Syntax (Methods)


```js

 describe('description for this tests', () => {
    beforeAll('runs before tests in this describe-block run' () => {
   // clear DB
    })

    beforeEach('runs before each test runs' () => {
   // set init values
    })

    afterEach(fn, timeout)...
    afterAll(fn, timeout)...
    test(name, fn)
    test.only()
    test.skip()
    test.each([])
    test.todo('Yes, I will...')
    ...
 })

```

---



#### Testing

// package.json
```js
 "scripts": {
    "test": "jest",
    "cover": "jest --coverage"
  },
```
// CLI
```js
 npm run test  
```
 or (if --global)
```js
 jest 
```

--

#### Code

// functions.js
```js
 const functions = {
    add: (a, b) => a + b
}

module.exports = functions;
```

--

#### Test
// functions.**_test_**.js

```js
 const functions = require('./functions'); // import

test('adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
});
```

--

#### Result
// Terminal

![result](result1.png)

---

#### Snapshots 

Jest creates snapshots from all serializable objects to compare with.

![matchSnapshot](matchSnapshot.png)

--

The serialized objects (e.g. HTML, JSON...) are stored in files in a special folder 

![Snapshotsfolder](snapshots.png)

--

 If snapshot is not matching...

 ![Replace snapshot?](replaceSnapshot.png)

--

// functions.**_test_**.js.**_snap_**
![Snapshotsfolder](snapshot.png)

 
---

#### Coverage

```js
jest --coverage
```

Jest shows a table to visualize the code coverage.
![Code coverage](coverage.png)

--

And it also creates a complete (linked) HTML report.
![Code coverage](coverage_html_master.png)

--

![Code coverage](coverage_html_detail.png)

---

#### Mocking

Mocking is very useful to test function calls. To check the invocation with its parameters and return values. And also to mock return values.

```js
const myMock = jest.fn()
// Fake return values for call 1, 2 and all others
myMock.mockReturnValueOnce(42)
      .mockReturnValueOnce('Darth Vader')
      .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 42, 'Darth Vader', true, true
```

--

Mocking a function

```js
const myMock = jest.fn(x => x + 5);
console.log(myMock)
  // > undefined

const values = [0, 1, 2];
values.forEach(myMock);

// function was called 3 times
expect(myMock).toBeCalledTimes(3);

 // the first argument of the first call was 0
expect(myMock.mock.calls[0][0]).toBe(0);

 // The return value of the second call was 6 (1 + 5)
expect(myMock.mock.results[1].value).toBe(6);

```

--

Mocking a timer

```js
// fake setTimeout
  jest.useFakeTimers();
  const callback = jest.fn();

  functions.waitASecond(callback);
  
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
  expect(callback).not.toHaveBeenCalled();
 
  jest.runAllTimers(); // time is over
  expect(callback).toHaveBeenCalled(); // callback is called

```

--

Mocking a module (e.g. fs API)

To mock a complete module you have to create its fake inside the \_\_mocks\_\_ directory and to implement the desired functionality.
While running the test, the fake implementation is used.

// \_\_mocks\_\_/fs.js
```js
// fake module nodes fs API
// used instead of the original fs.readFileSync()
function readFileSync(filePath) { 
    return mockFile[filePath] || '';
}

fs.readFileSync = readFileSync;

module.exports = fs;

```

--


// fileFunctions.js
```js
const fs = require('fs'); // original fs in prod mode

function getContent(path) {
  return fs.readFileSync(path);
}

exports.getContent = getContent;
```

--


// fileFunctions.**_test_**.js
```js
const fileFunctions = require('./fileFunctions');
jest.mock('fs'); // fake fs from __mocks__

describe('file access to mocked file system', () => {
  const MOCK_FILE_CONTENT = 
  {'/path/2/another.txt': 'some text'}

  beforeEach(() => {
    // set up a fake file
    require('fs').__setMockFileContent(MOCK_FILE_CONTENT);
  });

  test('content of file is correct', () => {    
    const content = fileFunctions.getContent('/path/2/another.txt');
    expect(content).toBe('some text');
  });
})

```

---



#### DOM Manipulation

DOM manipulation is not so tricky as feared using jQuery

```js
// displayUser.js
const functions = require('./functions');
const $ = require('jquery');

$('#button').on('click', () => {
  functions.getUser(user => {     
    const loggedText = 'Logged ' + (user.name ? 'In' : 'Out');
    $('#username').text(user.name + ' - ' + loggedText);
  });
});
```
--

Test 

```js
// displayUser.test.js
test('Displays Leanne Graham in username after a click', () => {
    // Set up our document body
    document.body.innerHTML =
    '<div><span id="username" /><button id="button" /></div>';
    const functions = require('./functions');
    const $ = require('jquery');

    $('#button').click(); // Use jquery to click
    window.setTimeout(function () {
        expect($('#username').text())
        .toEqual('Leanne Graham - Logged In');
    }, 3000);
});
```

