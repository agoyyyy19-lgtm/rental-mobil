async function testApi() {
  const filename = 'File:2022_Toyota_GR_86_(ZN8),_front_3.18.22.jpg';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=640&format=json`;
  
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
testApi();
