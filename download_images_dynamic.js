const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// Mapping of filename -> search query on Wikimedia Commons
const searchQueries = {
  'car_civic_typer.png': '2017 Honda Civic Type R GT i-VTEC Turbo 2.0 Front.jpg',
  'car_gr86.png': 'Toyota GR86',
  'car_mazda3.png': 'Mazda 3 Hatchback 2019',
  'car_fortuner.png': 'Toyota Fortuner 2021',
  'car_pajero_sport.png': 'Mitsubishi Pajero Sport 2021',
  'car_crv.png': '2023 Honda CR-V',
  'car_rush.png': 'Toyota Rush 2018',
  'car_terios.png': 'Daihatsu Terios 2018',
  'car_hrv.png': '2022 Honda HR-V',
  'car_camry.png': 'Toyota Camry 2019',
  'car_civic_sedan.png': 'Honda Civic 2022',
  'car_vios.png': 'Toyota Vios 2018',
  'car_city.png': 'Honda City Hatchback 2021',
  'car_brio.png': 'Honda Brio 2019',
  'car_yaris.png': 'Toyota Yaris 2018',
  'car_jazz.png': 'Honda Jazz RS 2019',
  'car_sirion.png': 'Daihatsu Sirion 2018',
  'car_mazda2.png': 'Mazda 2 Hatchback 2015',
  'car_agya.png': 'Toyota Agya 2023',
  'car_avanza.png': 'Toyota Avanza 2022',
  'car_xenia.png': 'Daihatsu Xenia 2022',
  'car_innova_zenix.png': 'Toyota Innova Zenix 2023',
  'car_ertiga.png': 'Suzuki Ertiga 2019',
  'car_xpander.png': 'Mitsubishi Xpander 2022',
  'car_alphard.png': 'Toyota Alphard 2023',
  'car_livina.png': 'Nissan Livina 2019',
  'car_veloz.png': 'Toyota Veloz 2022',
  'car_calya.png': 'Toyota Calya 2019'
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
  
  // Use first search result
  const title = searchData.query.search[0].title;
  
  // Request 500px thumbnail width to be standard & efficient
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
  
  // Standard thumbnail url
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
  console.log(`Searching and downloading ${keys.length} car images from Wikimedia Commons...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const filename of keys) {
    const query = searchQueries[filename];
    const destPath = path.join(destDir, filename);
    process.stdout.write(`  ${filename} (query: "${query}") ... `);
    
    try {
      const url = await getImageUrl(query);
      await download(url, destPath);
      const size = fs.statSync(destPath).size;
      console.log(`OK (${(size / 1024).toFixed(0)} KB)`);
      success++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
    
    // Add small delay to be polite to Wikipedia API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\nDone! ${success} downloaded, ${failed} failed.`);
}

main();
