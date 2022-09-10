const query = `
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media {
      coverImage {
        medium
      }
      title {
        romaji
      }
      description
    }
  }
}
`;

module.exports = query;
