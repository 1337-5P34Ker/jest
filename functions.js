const axios = require('axios'); // http client

const functions = {
    add: (a, b) => a + b,
    getOldMen: (people) => {
        var oldMen = [];
        people.forEach(person => {
            if (person.age > 50 && person.gender === 'male') {
                oldMen.push(person);
            }
        });
        return oldMen;
    },
    getWomen: (people) => {
        var women = [];
        people.forEach(person => {
            if (person.gender === 'female') {
                women.push(person);
            }
        });
        return women;
    },
    getTodos: () =>
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.data)
            .catch(error => 'error'),
    reverseString: (input) => {
        result = input
            .split('')
            .reverse()
            .join('');
        return result;
    },
    forEach: (items, callback) => {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    },
    waitASecond: (callback) => {
        console.log('go');
        setTimeout(function () {
            console.log('stop in real-time');
            callback();
        }, 10000);
    }

}

module.exports = functions;

