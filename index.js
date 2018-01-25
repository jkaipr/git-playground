require('dotenv').config();
const fetch = require('node-fetch');
const download = require('image-downloader');
const art = require('ascii-art');


const query = process.argv[2];
let unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.APP_ID}` ;
if (query) {
  unsplashUrl = unsplashUrl + `&query=${query}`;
}

fetch(unsplashUrl).then(response =>
  response.json().then(
    json => {
      downloadImage(json.urls.regular)
    }
  )
);

function downloadImage(url) {
  const options = {
    url: `${url}?client_id${process.env.APP_ID}`,
    dest: `${process.cwd()}/temp/${query}.jpg`
  };

  download.image(options)
    .then(({ filename }) => {
      console.log('File saved to: ', filename);
      makeAsciiArt(filename);
  });
}

function makeAsciiArt(filepath) {
  const image = new art.Image({
    filepath,
    alphabet: 'variant1',
  });

  image.write((error, rendered) => {
    console.log(rendered || error);
  });
}
