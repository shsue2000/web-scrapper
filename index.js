const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())
const url = 'https://www.theguardian.com/uk'
app.get('/', function(req, res) {
    res.json('Webscrapper')
})

app.get('/results', (req, res)=> {
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
        res.json(articles)
    }).catch(err => console.log(err))
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))