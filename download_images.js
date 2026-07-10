const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const images = [
  // Sport
  ['car_civic_typer.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2017_Honda_Civic_Type_R_Front.jpg/640px-2017_Honda_Civic_Type_R_Front.jpg'],
  ['car_gr86.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/2022_Toyota_GR_86_%28ZN8%29%2C_front_3.18.22.jpg/640px-2022_Toyota_GR_86_%28ZN8%29%2C_front_3.18.22.jpg'],
  ['car_mazda3.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2019_Mazda3_Skyactiv-G_2.0_front_%28revised%29.jpg/640px-2019_Mazda3_Skyactiv-G_2.0_front_%28revised%29.jpg'],

  // SUV
  ['car_fortuner.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28GUN166R%3B_second_facelift%29%2C_South_Tangerang.jpg/640px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28GUN166R%3B_second_facelift%29%2C_South_Tangerang.jpg'],
  ['car_pajero_sport.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/2022_Mitsubishi_Pajero_Sport_Dakar_Ultimate_4x2_%28facelift%29%2C_South_Tangerang.jpg/640px-2022_Mitsubishi_Pajero_Sport_Dakar_Ultimate_4x2_%28facelift%29%2C_South_Tangerang.jpg'],
  ['car_crv.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/2023_Honda_CR-V_1.5_Turbo_Prestige_%28RW%29%2C_South_Tangerang.jpg/640px-2023_Honda_CR-V_1.5_Turbo_Prestige_%28RW%29%2C_South_Tangerang.jpg'],
  ['car_rush.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/2018_Toyota_Rush_1.5_TRD_Sportivo_Ultimo%2C_West_Surabaya_%2820211025%29.jpg/640px-2018_Toyota_Rush_1.5_TRD_Sportivo_Ultimo%2C_West_Surabaya_%2820211025%29.jpg'],
  ['car_terios.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/2018_Daihatsu_Terios_1.5_R_Deluxe%2C_Denpasar_%2820180903%29.jpg/640px-2018_Daihatsu_Terios_1.5_R_Deluxe%2C_Denpasar_%2820180903%29.jpg'],
  ['car_hrv.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2022_Honda_HR-V_1.5_E_Special_Edition%2C_South_Tangerang.jpg/640px-2022_Honda_HR-V_1.5_E_Special_Edition%2C_South_Tangerang.jpg'],

  // Sedan
  ['car_camry.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2019_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282019-03-22%29_01.jpg/640px-2019_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282019-03-22%29_01.jpg'],
  ['car_civic_sedan.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2022_Honda_Civic_%28FE%29_1.5_RS%2C_South_Tangerang_%2820220512%29.jpg/640px-2022_Honda_Civic_%28FE%29_1.5_RS%2C_South_Tangerang_%2820220512%29.jpg'],
  ['car_vios.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/2018_Toyota_Vios_1.5_G_%28NCP150R%3B_second_facelift%29%2C_South_Tangerang_%2820191016%29.jpg/640px-2018_Toyota_Vios_1.5_G_%28NCP150R%3B_second_facelift%29%2C_South_Tangerang_%2820191016%29.jpg'],
  ['car_city.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/2022_Honda_City_Hatchback_RS_with_Honda_Sensing%2C_South_Tangerang.jpg/640px-2022_Honda_City_Hatchback_RS_with_Honda_Sensing%2C_South_Tangerang.jpg'],

  // Hatchback
  ['car_brio.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/2019_Honda_Brio_1.2_RS_%28DD1%3B_second_generation%2C_first_facelift%29%2C_South_Tangerang_%2820230528%29.jpg/640px-2019_Honda_Brio_1.2_RS_%28DD1%3B_second_generation%2C_first_facelift%29%2C_South_Tangerang_%2820230528%29.jpg'],
  ['car_yaris.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2018_Toyota_Yaris_1.5_TRD_Sportivo_%28NSP151R%29%2C_South_Tangerang.jpg/640px-2018_Toyota_Yaris_1.5_TRD_Sportivo_%28NSP151R%29%2C_South_Tangerang.jpg'],
  ['car_jazz.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/2019_Honda_Jazz_1.5_RS_%28facelift%29%2C_South_Tangerang.jpg/640px-2019_Honda_Jazz_1.5_RS_%28facelift%29%2C_South_Tangerang.jpg'],
  ['car_sirion.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/2018_Daihatsu_Sirion_1.3_%28M804RS%29%2C_Denpasar.jpg/640px-2018_Daihatsu_Sirion_1.3_%28M804RS%29%2C_Denpasar.jpg'],
  ['car_mazda2.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2015_Mazda2_%28DJ%29_Genki_hatchback_%282018-07-19%29_01.jpg/640px-2015_Mazda2_%28DJ%29_Genki_hatchback_%282018-07-19%29_01.jpg'],
  ['car_agya.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_Agya_1.2_G_%28B101RA%3B_second_generation%29%2C_South_Tangerang_%2820230603%29.jpg/640px-Toyota_Agya_1.2_G_%28B101RA%3B_second_generation%29%2C_South_Tangerang_%2820230603%29.jpg'],

  // MPV
  ['car_avanza.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2022_Toyota_Avanza_1.5_G_CVT_%28W101RE%29%2C_South_Tangerang_%2820221223%29.jpg/640px-2022_Toyota_Avanza_1.5_G_CVT_%28W101RE%29%2C_South_Tangerang_%2820221223%29.jpg'],
  ['car_xenia.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/2022_Daihatsu_Xenia_1.5_R_CVT_ADS_%28W101RE%29%2C_South_Tangerang_%2820221223%29.jpg/640px-2022_Daihatsu_Xenia_1.5_R_CVT_ADS_%28W101RE%29%2C_South_Tangerang_%2820221223%29.jpg'],
  ['car_innova_zenix.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2023_Toyota_Kijang_Innova_Zenix_Q_HEV_%28GUN162R%29%2C_South_Tangerang.jpg/640px-2023_Toyota_Kijang_Innova_Zenix_Q_HEV_%28GUN162R%29%2C_South_Tangerang.jpg'],
  ['car_ertiga.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2019_Suzuki_Ertiga_GX_1.5_%28MF%29%2C_South_Tangerang_%2820190912%29.jpg/640px-2019_Suzuki_Ertiga_GX_1.5_%28MF%29%2C_South_Tangerang_%2820190912%29.jpg'],
  ['car_xpander.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/2022_Mitsubishi_Xpander_Ultimate_%28facelift%29%2C_South_Tangerang.jpg/640px-2022_Mitsubishi_Xpander_Ultimate_%28facelift%29%2C_South_Tangerang.jpg'],
  ['car_alphard.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/2023_Toyota_Alphard_%28AGH40W%29%2C_South_Tangerang.jpg/640px-2023_Toyota_Alphard_%28AGH40W%29%2C_South_Tangerang.jpg'],
  ['car_livina.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/2019_Nissan_Livina_1.5_VL_%28W101MN%29%2C_South_Tangerang.jpg/640px-2019_Nissan_Livina_1.5_VL_%28W101MN%29%2C_South_Tangerang.jpg'],
  ['car_veloz.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/2022_Toyota_Veloz_Q_CVT_TSS_%28B101RA%29%2C_South_Tangerang_%2820221223%29.jpg/640px-2022_Toyota_Veloz_Q_CVT_TSS_%28B101RA%29%2C_South_Tangerang_%2820221223%29.jpg'],
  ['car_calya.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2019_Toyota_Calya_1.2_G_%28B401RA%3B_first_facelift%29%2C_South_Tangerang.jpg/640px-2019_Toyota_Calya_1.2_G_%28B401RA%3B_first_facelift%29%2C_South_Tangerang.jpg'],
];

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
  console.log(`Downloading ${images.length} car images via native fetch to ${destDir}...\n`);
  let success = 0;
  let failed = 0;

  for (const [filename, url] of images) {
    const destPath = path.join(destDir, filename);
    process.stdout.write(`  ${filename} ... `);
    try {
      await download(url, destPath);
      const size = fs.statSync(destPath).size;
      console.log(`OK (${(size / 1024).toFixed(0)} KB)`);
      success++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! ${success} downloaded, ${failed} failed.`);
}

main();
