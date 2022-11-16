const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express();
const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(response => {
        const html = response.data
        //console.log(html)
        const ch = cheerio.load(html)
        const articles = []

        ch('.fc-item__title', html).each(function(){
            const title = ch(this).text()
            const url = ch(this).find('a').attr('href')
            if (title.includes("FTX"))
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))