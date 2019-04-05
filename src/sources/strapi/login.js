const axios = require('axios');

// Request API.
axios
  .post('http://localhost:1337/auth/local', {
      identifier: 'mikepeiman@gmail.com',
      password: '326463'
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
  });