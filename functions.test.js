const functions = require('./functions');

var people = [];

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