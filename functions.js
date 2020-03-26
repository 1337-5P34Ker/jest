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
        .catch(error => 'error')

}

module.exports = functions;