export default async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || "default";
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "SERPER_API_KEY environment variable is not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const serperResponse = await fetch("https://google.serper.dev/images", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query, num: 12 })
    });

    const data = await serperResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
