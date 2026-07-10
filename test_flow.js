async function testSearchAndDownload() {
  const searchQuery = 'Toyota Avanza 2022 front';
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srnamespace=6&format=json`;
  
  try {
    const searchRes = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
      }
    });
    const searchData = await searchRes.json();
    if (!searchData.query?.search?.length) {
      console.log('No search results found');
      return;
    }
    
    const title = searchData.query.search[0].title;
    console.log('Found title:', title);
    
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
    const infoRes = await fetch(infoUrl, {
      headers: {
        'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
      }
    });
    const infoData = await infoRes.json();
    const pages = infoData.query?.pages;
    const pageId = Object.keys(pages)[0];
    const imageInfo = pages[pageId]?.imageinfo?.[0];
    
    if (imageInfo) {
      console.log('Original URL:', imageInfo.descriptionurl);
      console.log('Thumbnail URL:', imageInfo.thumburl);
    } else {
      console.log('No image info found');
    }
  } catch (err) {
    console.error(err);
  }
}
testSearchAndDownload();
