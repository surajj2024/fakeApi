const fs = require('fs')
const express = require('express')
const app = express()
const port = 1000
const jokes = require('./data')

const jokeMiddleware = (res,req,next)=>{
    console.log("Middleware triggered")
    next()
}

app.get('/jokes', jokeMiddleware,(req, res)=>{
    // console.log(req.joke);
    const randomJoke = Math.floor(Math.random()*jokes.length)
    console.log(jokes[randomJoke]);
    return res.status(200).json(jokes[randomJoke]);
})


app.get('/jokes/:jokeid',(req, res)=>{
    const jokeid = Number(req.params.jokeid)
    console.log(jokeid);
    //
    if(!Number(jokeid)){
        return req.status(400).json({
            status: false,
            message : "Invalid API"
        })
    }
    return res.status(200).json(jokes.find(joke => joke.id == jokeid))
})



app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`)
})