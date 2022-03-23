const express = require('express')
const mongoose = require('mongoose')
const helmet = require("helmet")
const unimodel = require('./models/unischema')
const msg = require('./example.js')
const dotenv = require('dotenv');
dotenv.config();

const app = express()
const port =  process.env.PORT || process.env.localport

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(express.static(__dirname + "/public"))
app.use('/icon/favicon.ico', express.static(__dirname + "/public/favicon.ico"));

// routes/endpoints

app.get('/roadmap', (req, res) => {
   res.json(msg)
})

// get all universities

app.get('/api', async(req, res) => {
//     const val = req.header('secret');
//     if(typeof val === 'undefined')
//     {
//         res.status(200).json({msg : "You need to set the header to request this API"})
//     }
//     else if(val !== "billy136")
//     {
//         res.status(200).json({msg : "You need special code to access the API"})
//     }
//     else
//     {
//         const list = await unimodel.find() 
//         res.status(200).send(list)
//     }
   const list = await unimodel.find() 
   res.status(200).send(list)
    
})

// get uni by name

app.get('/api/:name', async(req, res) => {
    const val = req.header('secret');
    if(typeof val === 'undefined')
    {
        res.status(200).json({msg : "You need to set the header to request this API"})
    }
    else if(val !== "billy136")
    {
        res.status(200).json({msg : "You need special code to access the API"})
    }
    else
    {
        const name = req.params.name
        const list = await unimodel.find({ "keyword" : `${name}` }) 
        if(list.length === 0)
        {
            res.status(404).json({msg : "university not found" })
        }
        else
        {
            res.status(200).send(list)
        }
    }  
})

// post uni data

app.post('/api', async(req, res) => {  
    const list = await new unimodel(req.body)
    list.save().
    then(
        (list) => {
        res.json({msg : "university data successfully inserted"}).status(200)
        },
        (err) =>{
            res.status(400).json({msg : err.message})
        }
    )
})

// update uni data

app.patch('/api/:name', async(req, res) => {
    const name = req.params.name
    const uni = await unimodel.updateOne({ "keyword" : `${name}` }, req.body, { new : true }) 
    if(uni.matchedCount == 1)
    {
        res.status(200).json({msg : "university data successfully found updated"})
    }
    else
    {
        res.status(404).json({msg : "university not found"})
    }
})

// delete uni data

app.delete('/api/:name', async(req, res) => {
    const name = req.params.name
    const uni = await unimodel.deleteOne({ "keyword" : `${name}` }) 
    if(uni.deletedCount == 0)
    {
        res.status(404).json({msg : "university not found"})
    }
    else
    {
        res.status(200).json({msg : "university data successfully deleted"})
    }
})

app.get('/*', (req,res)=>{
    res.status(404).json({msg : "this page is not the path of this API"})
})

// listen to port

app.listen(port, () => {
    console.log(`app is running on port : ${port}`)
})
