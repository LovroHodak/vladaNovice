const axios = require("axios");
const cheerio = require("cheerio");

/* const page_url = 'https://www.gov.si/drzavni-organi/vlada/' */
const page_url = 'https://www.nepremicnine.net/oglasi-prodaja/ljubljana-mesto/stanovanje/'

const stanovanja = []
let better = []

async function getNepremicnine (){
    const { data } = await axios.get(page_url);
    //console.log(data)
    const $ = cheerio.load(data);
    const mainDiv = $('div.seznam')
    //console.log(mainDiv)
    mainDiv.find('div').each((i, element) => {
        const $element = $(element)
        
        const nepremicnina = {}
        
        
        nepremicnina.lokacija = $element.find('span.title').text()
        nepremicnina.sobe = $element.find('span.tipi').text()
        nepremicnina.cena = $element.find('span.cena').text()
        nepremicnina.link = 'https://www.nepremicnine.net' + $element.find('h2>a').attr('href')

        if (nepremicnina.link !== 'https://www.nepremicnine.netundefined'){
            stanovanja.push(nepremicnina)
        } 


    })

    for (let i = 0; i < stanovanja.length; i = i + 2){
        better.push(stanovanja[i])
    }

    console.log(better)
    
}



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

        news.push(newsTitle)

        console.log(news.length)

    })
}

/* getVladaNews() */

getNepremicnine()

