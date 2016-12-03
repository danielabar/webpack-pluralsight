console.log('App loaded');

// simulate a scenario where an existing file assumes jQuery is a global
$('#testDiv').text('jQuery modified this content(see app.js)');

require('./login');
