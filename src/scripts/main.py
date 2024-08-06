import bbc
import cnn
import requests
import xakata

urls = cnn.get_news_url()
urls += xakata.get_news_url()
urls += bbc.get_news_url()

for url in urls:
    print(f"Sending {url}")
    response = requests.post(
        "https://ailazynews.vercel.app/api/extract",
        json={"url": url},
    )

