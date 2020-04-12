const StorageService = require('./sorageService');

let sorageService;
let key = 'heroes';
const mockHeroes = [{
    type: 'Jedi',
    name: 'Yoda'
}, {
    type: 'Sith',
    name: 'Darth Maul'
}, {
    type: 'Jedi',
    name: 'Obi-Wan Kenoby'
}];

describe('Tests mit dem StorageService', () => {

    beforeAll(() => {
        storageService = new StorageService();        
    });

    beforeEach(() => {
        storageService.clearAll();
    })

    test('storageService should be defined', () => {
        expect(storageService).toBeDefined();
    })

    test('Storage should be empty', () => {        
        expect(storageService.get(key)).toBeNull();
    })

    test('StorageService should store 3 heroes', () => {
        storageService.set(key, JSON.stringify(mockHeroes));
        expect(JSON.parse(window.localStorage.getItem(key)).length).toBe(3);
    })

    test('StorageService should return at least Yoda', () => {
        window.localStorage.setItem(key, JSON.stringify(mockHeroes));
        expect(JSON.parse(storageService.get(key))).toContainEqual({
            type: 'Jedi',
            name: 'Yoda'
        });
    })
})