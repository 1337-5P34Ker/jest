const foo = require('./foo');
describe('tests for code coverage', () => {
        
      test('used should return used code', () => {

        expect(foo.used()).toBe('used code');
      });
})