const query =  require('../gql/queries/Media');

const express = require('express');
const { json } = require("express");
const router = express.Router();

const variables = {
  page: 1,
  perPage: 10
};

const url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
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
  const results = await fetch(url, options);
  const jsonResults = await results.json();
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
