const functions = {
    add: (a, b) => a + b,
    getOldMen: (people) => {
        var oldMen = [];
        people.forEach(person => {
            if(person.age > 50 && person.gender === 'male'){
                oldMen.push(person);
            }
        });
        return oldMen;        
    },
    getWomen: (people) => {
        var women = [];
        people.forEach(person => {
            if(person.gender === 'female'){
                women.push(person);
            }
        });
        return women;        
    }
}

module.exports = functions;