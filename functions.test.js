const functions = require('./functions');

var people = [];
jest.useFakeTimers();

describe('tests for people', () => {

    beforeEach(() => {
        people = [{
            name: 'Rocco',
            age: 48,
            gender: 'male'
        },
        {
            name: 'Yoda',
            age: 800,
            gender: 'male'
        },
        {
            name: 'Padme Amidala',
            age: 30,
            gender: 'female'
        },
        ];
    });

    test('getOldMen returns old men', () => {

        expect(functions.getOldMen(people)).toHaveLength(1);
    });

    test('getWomen returns women', () => {

        expect(functions.getWomen(people)).toHaveLength(1);
        expect(functions.getWomen(people)).toMatchSnapshot();
    });
})

describe('tests for numbers', () => {

    test('adds 1 + 2 to equal 3', () => {
        expect(functions.add(1, 2)).toBe(3);
    });

    test('2 plus 2', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);

        // toBe and toEqual are equivalent for simple types
        expect(value).toBe(4);
        expect(value).toEqual(4);
    });

    test('adding floating point numbers', () => {
        const value = 0.1 + 0.2;
        //expect(value).toBe(0.3);           This won't work because of rounding error
        expect(value).toBeCloseTo(0.3); // This works.
    });

});

describe('tests for truthiness', () => {

    test('null', () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    test('zero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });
})

describe('tests for strings', () => {

    test('there is no X in Rocco', () => {

        expect('Rocco').not.toMatch(/X/);
    });

    test('but there is a "stop" in Christoph', () => {

        expect('Christoph').toMatch(/stop/);
    });

    test('reverseString exists in functions', () => {
        expect(functions.reverseString).toBeDefined()
    })

    test('reverseStrings reverses a string', () => {
        expect(functions.reverseString('abc')).toEqual('cba')
    });
})

describe('tests for arrays and iterables', () => {

    const todos = [
        'buy toilet paper',
        'buy noodles',
        'stay home',
        'have fun',
        'survive',
    ];

    test('the todos contains stay home', () => {

        expect(todos).toContain('stay home');
        expect(new Set(todos)).toContain('stay home');
    });
})

describe('tests for exceptions', () => {

    function buyToiletPaper() {
        throw new Error('404 not found');
    }

    test('buy toilet paper throws an exception', () => {

        expect(buyToiletPaper).toThrow();
        expect(buyToiletPaper).toThrow(Error);

        // You can also use the exact error message or a regexp
        expect(buyToiletPaper).toThrow('404 not found');
        expect(buyToiletPaper).toThrow(/404/);
    });
})

// async
describe('fetch data from an API', () => {
    beforeEach(() => {

        expectedToDo = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
    });

    test('get todos get a todo like expected', () => {

        // with a promise
        expect.assertions(2); // ToDo: why 2?
        return functions.getTodos()
            .then(toDo => {
                expect(toDo.completed).toBeFalsy()
                expect(toDo.title).toEqual(expectedToDo.title)
            });
    })


    test('get todos get a todo like expected as async', async () => {

        // with async/await
        expect.assertions(2); // ToDo: why 2?
        const toDo = await functions.getTodos();
        expect(toDo.completed).toBeFalsy()
        expect(toDo.title).toEqual(expectedToDo.title)
    })
})

// Mocking

describe('testing with mocked functions', () => {

    test('test is calling the mocked callback', () => {
        const mockedCallback = jest.fn(x => x + 5);

        const values = [0, 1, 2];
        values.forEach(mockedCallback);

        // function was called 3 times
        expect(mockedCallback).toBeCalledTimes(3);

        // the first argument of the first call was 0
        expect(mockedCallback.mock.calls[0][0]).toBe(0);

        // The first argument of the second call was 1
        expect(mockedCallback.mock.calls[1][0]).toBe(1);

        // The return value of the first call was 6 (1 + 5)
        expect(mockedCallback.mock.results[1].value).toBe(6);
    })


    test('the setTimeout should be called 1x after 10s', () => {
        const callback = jest.fn();
        functions.waitASecond(callback);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
        expect(callback).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(callback).toHaveBeenCalled();
    })

})


expect.extend({
    toBeJedi(received) {
        const pass = ['Yoda', 'Obi-Wan Kenobi', 'Mace Windu', 'Qui-Gon Jinn', 'Rey', 'Luke Skywalker', 'Anakin Skywalker'].indexOf(received) != -1;
        if (pass) {
            return {
                message: () =>
                    `expected ${received} shouldn't be a Jedi.`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} should be a Jedi`,
                pass: false,
            };
        }
    },
});

describe.only("Check for Jedi", () => {

    // Test with an array of test values
    const characters = [
        ['Yoda', true],
        ['Darth Vader', false],
        ['Luke Skywalker', true]
    ];

    test('Yoda is a Jedi but Darth Vader is not', () => {
        expect('Yoda').toBeJedi();
        expect('Darth Vader').not.toBeJedi();
        expect({ jedi: 'Luke Skywalker', sith: 'Darth Maul' })
            .toEqual({
                jedi: expect.toBeJedi(),
                sith: expect.not.toBeJedi(),
            });
    });

    // Test iterates over all characters
    test.each(characters)(
        'Jedi should be detected',
        (character, expectedResult) => {
            switch (expectedResult) {
                case true:
                    expect(character).toBeJedi();
                    break;
                case false:
                    expect(character).not.toBeJedi();
                    break;
            }
        }
    );
});