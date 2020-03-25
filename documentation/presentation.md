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

#### Syntax ("matchers")

more than 50 matchers avail.
```js
 expect(value)
 .toBe(value)
 .toHaveBeenCalled()
 .toBeDefined()
 .toBeFalsy()
 .toContain(item)
 .toEqual(value)
 .toMatch(regExp)
 ...
```
---



## Testing

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
// functions.test.js

```js
 const functions = require('./functions'); // import

test('adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
});
```

--

#### Result
// Terminal

```js
> jest

 PASS  ./functions.test.js
  √ adds 1 + 2 to equal 3 (1ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.32s
Ran all test suites.
PS C:\Users\rocco.hundertmark\Documents\Jest\jest_basics>
```

