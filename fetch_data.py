import os
import json
import requests

# Retrieve secret key from GitHub environment
API_KEY = os.getenv("SERPER_API_KEY")
QUERY = "mechanic artwork" # Modify your search query as needed

if not API_KEY:
    raise ValueError("SERPER_API_KEY environment variable is missing.")

url = "https://google.serper.dev/images"
headers = {
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json"
}
payload = json.dumps({"q": QUERY, "num": 20})

response = requests.post(url, headers=headers, data=payload)

if response.status_code == 200:
    # Save search results to a static JSON file
    with open("results.json", "w") as f:
        f.write(response.text)
    print("Successfully updated results.json")
else:
    print(f"Failed to fetch data: {response.status_code}")
