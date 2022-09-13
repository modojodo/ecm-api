const query =  require('../gql/queries/Media');

const express = require('express');
const axios = require('axios');
const router = express.Router();

const variables = {
  page: 1,
  perPage: 10
};

const options = {
  url: 'https://graphql.anilist.co',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  data: {
    query,
    variables
  }
};

function flattenMedia (media) {
  return media.map(({ coverImage: { medium }, title: { romaji }, description }) => {
    return {
      image: medium,
      title: romaji,
      description
    }
  });
}


// Get media objects
router.get('/media', async (req, res)  => {
  const results = await axios(options);
  const jsonResults = results.data
  // healthy check for results
  let mediaResults = jsonResults
                        && jsonResults.data.Page
                        && jsonResults.data.Page.media
                        && jsonResults.data.Page.media.length
                        ? jsonResults.data.Page.media : []

  if (mediaResults.length) {
    mediaResults = flattenMedia(mediaResults);
  }
  res.json({ media: mediaResults });
});

module.exports = router;
