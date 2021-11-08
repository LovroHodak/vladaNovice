const axios = require("axios");
const cheerio = require("cheerio");

const page_url = 'https://www.gov.si/drzavni-organi/vlada/'

async function getVladaNews(){
    const { data } = await axios.get(page_url);
    //console.log(data)
    const $ = cheerio.load(data);

    const ul = $('ul.exposed-news-list')

    const news = []

    ul.find('li').each((i, element) => {
        const $element = $(element)
        const newsTitle = {}
        newsTitle.name = $element.find('h3').text()
        //console.log($element.text())
        newsTitle.date = $element.find('time').text()
        newsTitle.content = $element.find('p').text()
        newsTitle.link = 'https://www.gov.si/' + $element.find('a').attr('href')
        console.log(newsTitle)

    })
}

getVladaNews()

