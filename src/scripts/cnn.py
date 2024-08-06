import requests
from bs4 import BeautifulSoup
from utils import normalize_url


def get_news_url():
    articles = []
    response = requests.get("https://edition.cnn.com/")
    soup = BeautifulSoup(response.text, "html.parser")
    elements = soup.find_all("div", attrs={"data-section": True})
    for element in elements:
        url = f"https://edition.cnn.com{normalize_url(element.find('a')['href'])}"
        articles.append(url)

    return articles[:4]
