const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

// you can use redfincom but you need to apply filters before pasting the url from the page, same as zillow.com 
// const url = 'https://www.redfin.com/zipcode/48221/filter/max-price=75k,min-beds=3'

const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.dcr-omk9hw', html).each(function() {
            const title = $(this).text()
            const articleUrl = $(this).find('a').attr('href')
            articles.push({
                title,
                url: url + articleUrl
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

