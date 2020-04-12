// displayUser.js
const functions = require('./functions');

const $ = require('jquery');

$('#button').on('click', () => {
  functions.getUser(user => {     
    const loggedText = 'Logged ' + (user.name ? 'In' : 'Out');
    $('#username').text(user.name + ' - ' + loggedText);
  });
});