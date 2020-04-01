class StorageService {
    constructor() {}
    clearAll() {
        window.localStorage.clear()
    };
    get(key) {
        return window.localStorage.getItem(key);
    }
    set(key, value) {
        window.localStorage.setItem(key, value);
    }
}

module.exports = StorageService;