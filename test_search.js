async function searchApi() {
  const query = 'Toyota Avanza 2022';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
      }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
searchApi();
