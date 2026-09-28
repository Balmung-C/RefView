// refview/netlify/functions/search.js

exports.handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  // Grab query parameter
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

  if (!SERPER_KEY) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'SERPER_API_KEY environment variable is not set in Netlify.' })
    };
  }

  // Fetch 8 pages concurrently using native Node.js fetch
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

    // Aggregate images across all fetched pages
    let rawImages = [];
    responses.forEach(data => {
      if (data && Array.isArray(data.images)) {
        rawImages = rawImages.concat(data.images);
      }
    });

    // Deduplicate images by URL
    const seenUrls = new Set();
    const uniqueImages = rawImages.filter(item => {
      const url = item.imageUrl || item.thumbnailUrl;
      if (!url || seenUrls.has(url)) return false;
      seenUrls.add(url);
      return true;
    });

    // Match exact Serper output schema so frontend parsers don't fail
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        searchParameters: {
          q: query,
          type: 'images',
          engine: 'google'
        },
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
