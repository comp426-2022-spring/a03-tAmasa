const express = require("express")
const http = require("http")
const {coinFlip, coinFlips, countFlips, flipACoin} = require("./modules/coin.js")
const app = express()
var args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

console.log(coinFlip())
app.use(function(req,res) {
    res.status(404).send('404 NOT FOUND')
})
