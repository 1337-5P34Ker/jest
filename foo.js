const foo = {
    
    used: () => {
        return 'used code';
    },
    dead: () => {
        console.warn('You have reached untested code!!')
    },

}
module.exports = foo;