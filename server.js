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
// app.use(function(req,res) {
//     res.status(404).send('404 NOT FOUND')
// })

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/', (req,res) => {
    res.send('welcome to the api!')
})

app.get('/app/flip', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.json({flip: coinFlip()})
    
        
    });

app.get('/app/flips/:number', (req,res) =>{
    res.statusCode = 200
    res.statusMessage= "OK"
    const flips = parseInt(req.params.number)
    if(!Number.isInteger(req.params.number)){
        res.status(404).send('Integer not passed')
    }
    const flipResults = coinFlips(flips)
    const summary = countFlips(flipResults)
    res.json({'raw' : flipResults, 'summary' : summary})
})

app.get('/app/flip/call/:flip(heads|tails)', (req,res) =>{
    const guessResult = flipACoin(req.params.flip)
    res.status(200).send(guessResult)

})



app.use(function(req,res) {
    res.status(404).send('404 NOT FOUND')
})