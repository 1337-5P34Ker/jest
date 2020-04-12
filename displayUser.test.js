test('Displays Leanne Graham in username 5s after a click', () => {
    // Set up our document body
    document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="button" />' +
        '</div>';
    ;
    const functions = require('./functions');
    const spy = jest.spyOn(functions, 'getUser');

    const $ = require('jquery');

    // Use jquery to emulate a click on our button
    $('#button').click();

    // wait 5 seconds for real API call
    window.setTimeout(function () {
        expect(spy).toHaveBeenCalledTimes(1); // getUser()
        expect($('#username').text()).toEqual('Leanne Graham - Logged In');
    }, 3000);
});