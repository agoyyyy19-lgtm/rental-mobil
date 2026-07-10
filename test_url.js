const fs = require('fs');

async function test() {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2017_Honda_Civic_Type_R_Front.jpg/500px-2017_Honda_Civic_Type_R_Front.jpg';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
      }
    });
    console.log('Status:', res.status, res.statusText);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
