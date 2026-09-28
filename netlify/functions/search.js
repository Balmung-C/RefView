const fetch = require('node-fetch');

exports.handler = async (event) => {
  // 1. Grab parameters or set defaults
  const query = event.queryStringParameters.q || '';
  const SERPER_KEY = process.env.SERPER_API_KEY;

  if (!query) {
    return {
      statusCode: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Query parameter "q" is required.' })
    };
  }

  // 2. Fetch 8 pages in parallel (~96-100 total images)
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  try {
    const fetchPromises = pageNumbers.map(page =>
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: {
          'X-API-KEY': SERPER_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: query,
          page: page
        })
      }).then(res => res.json())
    );

    const responses = await Promise.all(fetchPromises);

    // 3. Aggregate images across all page responses
    let rawImages = [];
    responses.forEach(data => {
      if (data && Array.isArray(data.images)) {
        rawImages = rawImages.concat(data.images);
      }
    });

    // 4. Deduplicate items by image URL
    const seenUrls = new Set();
    const uniqueImages = rawImages.filter(item => {
      const url = item.imageUrl || item.thumbnailUrl;
      if (!url || seenUrls.has(url)) return false;
      seenUrls.add(url);
      return true;
    });

    // 5. Format payload for your frontend
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        count: uniqueImages.length,
        images: uniqueImages
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: err.message })
    };
  }
};
