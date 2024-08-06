import requests
from bs4 import BeautifulSoup
from utils import normalize_url


def get_news_url():
    articles = []
    response = requests.get("https://www.xataka.com/")
    soup = BeautifulSoup(response.text, "html.parser")
    elements = soup.find_all("article", attrs={"class": "abstract-article"})
    for element in elements:
        title = element.find("h2", attrs={"class": "abstract-title"})
        url = f"{normalize_url(title.find('a')['href'])}"
        articles.append(url)

    return articles[:4]
