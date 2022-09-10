const query =  require('../gql/queries/Media');

const express = require('express');
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


// Get media objects
router.get('/media', async (req, res)  => {
  const results = await fetch(url, options);
  const jsonResults = await results.json();
  res.json(jsonResults);
});

module.exports = router;
