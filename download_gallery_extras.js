const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const searchQueries = {
  'car_interior.png': 'modern car dashboard steering wheel',
  'car_wheel.png': 'car alloy wheel tire'
};

async function getImageUrl(query) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  
  const searchRes = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
    }
  });
  const searchData = await searchRes.json();
  if (!searchData.query?.search?.length) {
    throw new Error('No search results');
  }
  
  const title = searchData.query.search[0].title;
  
  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`;
  const infoRes = await fetch(infoUrl, {
    headers: {
      'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
    }
  });
  const infoData = await infoRes.json();
  const pages = infoData.query?.pages;
  if (!pages) throw new Error('No pages in query response');
  
  const pageId = Object.keys(pages)[0];
  const imageInfo = pages[pageId]?.imageinfo?.[0];
  if (!imageInfo) throw new Error('No imageinfo in page response');
  
  return imageInfo.thumburl || imageInfo.url;
}

async function download(url, dest) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'RenCarGENZ/1.0 (rental-mobil-app; contact@rencargenz.com)'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
}

async function main() {
  const keys = Object.keys(searchQueries);
  console.log(`Downloading gallery extras...\n`);
  
  for (const filename of keys) {
    const query = searchQueries[filename];
    const destPath = path.join(destDir, filename);
    console.log(`  Downloading ${filename} for query "${query}"...`);
    try {
      const url = await getImageUrl(query);
      await download(url, destPath);
      console.log(`  Successfully downloaded ${filename}`);
    } catch (e) {
      console.error(`  Failed to download ${filename}: ${e.message}`);
    }
  }
}

main();
